var expect = require('chai').expect;

var directory = './example';

describe('File reading tests', function(){
	it('Should contain \'en\', \'fr\', \'es\'', function(){
		var sl = require('../simple-locale.js')('en', directory);
		for(var el of ['en', 'fr', 'es']){
			expect(sl.locales).to.contain.keys(el);
		}
	});
});

describe('I18n tests', function(){
	it('Should respond Hello!', function(){
		var sl = require('../simple-locale.js')('en', directory);
		expect(sl.i18n('trad.hello')).to.eql('Hello!');
	});

	it('Should respond Salut!', function(){
		var sl = require('../simple-locale.js')('fr', directory)
		expect(sl.i18n('trad.hello')).to.eql('Salut!');
	});

	it('Should respond trad.test', function(){
		var sl = require('../simple-locale.js')('en', directory);
		expect(sl.i18n('trad.test')).to.eql('trad.test');	
	});

	it('Should respond Please for N/A | en, Por favor for es, Svp for fr', function(){
		var sl = require('../simple-locale.js')('en', directory);
		expect(sl.i18n('trad.please')).to.eql('Please');
		expect(sl.i18n('trad.please', 'en')).to.eql('Please');
		expect(sl.i18n('trad.please', 'es')).to.eql('Por favor');
		expect(sl.i18n('trad.please', 'fr')).to.eql('Svp');
	});

	it('Should build string', function(){
		var sl = require('../simple-locale.js')('en', directory);
		expect(sl.build('un petit {{ animal }}', {animal: 'poulet'})).to.eql('un petit poulet');
	});

	it('Should throw an error', function(){
		expect(require('../simple-locale.js')).to.throw(Error, 'Impossible to read files');
	});

	it('Should find sublevel string', function(){
		let sl = require('../simple-locale')('en', directory);
		expect(sl.i18n('sublevel.one', 'fr')).to.eql('Sublevel one test');
		expect(sl.i18n('sublevel.two.one', 'fr')).to.eql('Sublevel one of sublevel two');
	})
});
