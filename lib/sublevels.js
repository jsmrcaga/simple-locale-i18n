let sublevels = function(keys, locale, placeholder, index=0){
	if(!keys[index]){
		// found object
		return locale;
	}

	if(!locale[keys[index]]){
		// key does not exist
		console.warn(`Key ${keys[index]} not recognized in sublevels`);
		return placeholder;
	}

	// recursion
	return sublevels(keys, locale[keys[index]], placeholder, index+1);
}

module.exports = sublevels;