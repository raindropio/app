import en_US from '~assets/languages/en.json'

const Translate = {
	fallback: en_US,
	strings: {},
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
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/de.json'); break;
			case 'es':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/es.json'); break;
			case 'fi':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/fi.json'); break;
			case 'fr':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/fr.json'); break;
			case 'it':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/it.json'); break;
			case 'nl':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/nl.json'); break;
			case 'pl':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/pl.json'); break;
			case 'pt':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/pt.json'); break;
			case 'kk':
			case 'uk':
			case 'ru':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/ru.json'); break;
			case 'sv':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/sv.json'); break;
			case 'tr':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/tr.json'); break;
			case 'zh':
				Translate.strings = await import(/* webpackPreload: true */ '~assets/languages/zh.json'); break;

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
		Translate._onChange(Translate.loaded)
	}
}

export default Translate