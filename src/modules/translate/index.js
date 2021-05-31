import en_US from '~assets/languages/en.json'
import { getLanguage } from '~target'

function normalizeLangCode(_lang='') {
	const lang = String(_lang).toLowerCase()

	if (lang == 'zh-cn' || lang.includes('hans'))
		return 'zh-Hans'
	else if (lang.startsWith('zh'))
		return 'zh-Hant'

	return lang.substr(0,2)
}

const Translate = {
	fallback: en_US,
	strings: {},
	currentLang: '',
	loaded: false,

	s: (key)=>{
		return Translate.strings[key] || Translate.fallback[key] || key || ''
	},

	has: (key)=>{
		if (Translate.strings[key] || Translate.fallback[key])
			return true
		return false
	},

	format: function(key) {
		var formatted = Translate.s(key)
		for( var arg in arguments ) {
			if (arg>0)
				formatted = formatted.replace('{' + (arg-1) + '}', arguments[arg])
		}
		return formatted
	},

	init: async (browserLang='')=>{
		if (Translate.loaded && Translate.currentLang == browserLang)
			return;

		if (!browserLang)
			browserLang = getLanguage()

		Translate.currentLang = normalizeLangCode(browserLang)

		switch (Translate.currentLang) {
			case 'de':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/de.json');
				break;
			case 'es':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/es.json');
				break;
			// case 'fi':
			// 	Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/fi.json');
			// 	break;
			case 'fr':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/fr.json');
				break;
			case 'hi':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/hi.json');
				break;
			case 'it':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/it.json');
				break;
			case 'ja':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/ja.json');
				break;
			case 'ko':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/ko.json');
				break;
			case 'nl':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/nl.json');
				break;
			case 'pl':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/pl.json');
				break;
			case 'pt':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/pt_BR.json');
				Translate.currentLang = 'pt_BR'
				break;
			case 'ru':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/ru.json');
				break;
			case 'sv':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/sv.json');
				break;
			case 'tr':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/tr.json');
				break;
			case 'zh-Hans':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/zh-Hans.json');
				break;
			case 'zh-Hant':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/zh-Hant.json');
				break;

			//Reset to default
			default:
				Translate.currentLang = 'en'
				Translate.strings = Translate.fallback
			break;
		}

		Translate.changeState(true)
	},

	changeState: (state)=>{
		Translate.loaded = state
	}
}

export default Translate