# Simple Locale Internationalization (I18n)
This is an extremely simple i18n module, only for those too lazy to code their own.

# API

## Instanciation
`var locales = require('simple-locale-i18n')('en', './locales');`

To instanciate a `locales` object, call `require` and the constructor function by passing
3 parameters to it:

|| `default_locale` | `directory` | `callback` | 
|:-:|:-:|:-:|:-:|
|**Required**| `false` | `false` | `false`|
|**Description**| The default locale when none specified, example: `en`| The directory to read locales from. Locales will have the name of the files they are read from | A callback function to call when all locales are read |


## Locale Files
The module will read the folder `./locales` by default. This folder should be located in the same directory where the locales object is instanciated.
You can change the folder name by adding a 2nd parameter to the constructor function.

### Format
By default, locale files are in JSON format, thus `.json` extension (this will be checked against when instanciated). And should be written like:
```
{
	"some_key": "The translation",
	"some_other_key": "Another translation"
}
```

## Translating
To translate simply call the `i18n` method from the instanciated object:

```
var locales = require('simple-locale-i18n')('en', './locales');
locales.i18n('trad.hello'); // 'Hello!'
locales.i18n('trad.hello', 'fr'); // 'Salut!'
```

To simplify, you can also define a helper variable:
```
var locales = require('simple-locale-i18n')('en', './locales');
const i18n = locales.i18n;
i18n('trad.hello'); // 'Hello!'
i18n('trad.hello', 'fr'); // 'Salut!'
```

## Building
You can also build strings, mustache-style:

```javascript
var string = 'Hello {{ name }}! This is a translation into {{ language }} using {{ package }}';
i18n.build(string, {
		name: 'John',
		language: 'English',
		package: 'simple-locale'
});
// returns 'Hello John! This is a translation into English using simple-locale'
```

## Translate
This is a utility function that allows you to simply build strings only giving the locale. It is a 
composition of `i18n` and `build`.

```javascript
//en.trad.say_hello = 'Hello we are in {{ country }}!';
//fr.trad.say_hello = 'Salut, on est en {{ country }}!';
var string = i18n.translate('trad.say_hello', {
	[locale]: 'en',
	[placeholder]: 'Hi!',
	values:{
		en: {
			country: 'England'
		},
		fr:{
			country: 'France'
		}
	}
});

string === 'Hello we are in England' // true
```