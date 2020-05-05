import en_US from '~assets/languages/en.json'
import date_en_US from 'date-fns/locale/en-US'

const Translate = {
	fallback: en_US,
	strings: {},
	datelocale: {},
	currentLang: '',
	loaded: false,

	onChange: (func)=>{
		Translate._onChange = func
		Translate.init().catch(()=>{
			Translate.changeState(true)
		})
	},

	s: (key)=>{
		return Translate.strings[key] || Translate.fallback[key] || key || ''
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
			try{
				browserLang = navigator.language || navigator.userLanguage || ''
				browserLang = browserLang.trim().toLowerCase()
			}catch(e){}

		Translate.currentLang = browserLang.toLowerCase().substr(0,2)

		switch (browserLang) {
			case 'de':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/de.json');
				Translate.datelocale = await import(/* webpackPreload: true */ 'date-fns/locale/de');
				break;
			case 'es':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/es.json');
				Translate.datelocale = await import(/* webpackPreload: true */ 'date-fns/locale/es');
				break;
			case 'fi':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/fi.json');
				Translate.datelocale = await import(/* webpackPreload: true */ 'date-fns/locale/fi');
				break;
			case 'fr':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/fr.json');
				Translate.datelocale = await import(/* webpackPreload: true */ 'date-fns/locale/fr');
				break;
			case 'it':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/it.json');
				Translate.datelocale = await import(/* webpackPreload: true */ 'date-fns/locale/it');
				break;
			case 'nl':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/nl.json');
				Translate.datelocale = await import(/* webpackPreload: true */ 'date-fns/locale/nl');
				break;
			case 'pl':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/pl.json');
				Translate.datelocale = await import(/* webpackPreload: true */ 'date-fns/locale/pl');
				break;
			case 'pt':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/pt.json');
				Translate.datelocale = await import(/* webpackPreload: true */ 'date-fns/locale/pt');
				break;
			case 'kk':
			case 'uk':
			case 'ru':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/ru.json');
				Translate.datelocale = await import(/* webpackPreload: true */ 'date-fns/locale/ru');
				break;
			case 'sv':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/sv.json');
				Translate.datelocale = await import(/* webpackPreload: true */ 'date-fns/locale/sv');
				break;
			case 'tr':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/tr.json');
				Translate.datelocale = await import(/* webpackPreload: true */ 'date-fns/locale/tr');
				break;
			case 'zh':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/zh.json');
				Translate.datelocale = await import(/* webpackPreload: true */ 'date-fns/locale/zh-CN');
				break;

			//Reset to default
			default:
				Translate.currentLang = 'en'
				Translate.strings = Translate.fallback
				Translate.datelocale = date_en_US
			break;
		}

		Translate.changeState(true)
	},

	changeState: (state)=>{
		Translate.loaded = state
		Translate._onChange(Translate.loaded)
	}
}

export default Translate