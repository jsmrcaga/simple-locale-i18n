var fs = require('fs');
let sublevels = require('./lib/sublevels');


var locale = function(default_locale, dir){
	var loc = {};
	loc.locales = {};

	if(!dir){
		dir = './locales'
	}

	try{
		var files = fs.readdirSync(dir);
	} catch(err) {
		throw new Error('Impossible to read files', err);
	}
	
	for(var file of files){
		ext = file.split('.');
		if(ext[ext.length - 1].toLowerCase() !== 'json'){
			continue;
		}
		var filename = ext.slice(0, ext.length -  1).join('.');
		if(loc.locales[filename]){
			throw new Error('Duplicate locale ' + filename);
		}
		loc.locales[filename] = JSON.parse(fs.readFileSync(`${dir}/${filename}.json`));
	}

	var default_locale = default_locale || 'en';

	loc.i18n = function(key, locale, placeholder){
		if(!placeholder){
			placeholder = key;
		}

		if(!locale){
			locale = default_locale;
		}

		if(!loc.locales[locale]){
			console.error(new Error(`Locale ${locale} is not defined, switching to default: ${default_locale}`));
			locale = default_locale;
		}

		if(!(key in loc.locales[locale])){
			// try sublevels
			if(key.indexOf('.') > -1){
				let keys = key.split('.');
				return sublevels(keys, loc.locales[locale], placeholder);
			}

			return placeholder;
		}

		return loc.locales[locale][key];
	};

	loc.default = function(def){
		default_locale = def;
	};

	loc.build = function(string, values){
		for(var k in values){
			var reg = new RegExp(`{{(\\s+)?${k}(\\s+)?}}`, 'gi');
			string = string.replace(reg, values[k]);
		}
		return string;
	}

	loc.translate = function(key, params){
		// params are {locale, placeholder and locale values}
		params.values = params.values || {};

		var i18n = loc.i18n(key, params.locale, params.placeholder);
		if(!params.locale){
			params.locale = default_locale;
		}
		var values = null;
		if(!(params.locale in params.values)){
			values = Object.keys(params.values)[0] ? params.values[Object.keys(params.values)[0]] : {};
		} else {
			values = params.values[params.locale];
		}
		return loc.build(i18n, values);
	};

	return loc;
};

module.exports = locale;