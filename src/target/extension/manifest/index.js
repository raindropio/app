const fs = require('fs')
const locales = require('./locales')

function file({ emitFile }, filename) {
	const name = 'assets/'+filename.split('/').pop()
	emitFile(name, fs.readFileSync(`${__dirname}/${filename}`))
	return name
}

module.exports = ({ vendor, production=false }, l) => {
	const { version } = JSON.parse(fs.readFileSync(`${__dirname}/../../../../package.json`, 'utf-8'))

	//locales generation
	locales(l)

	const json = {
		manifest_version:3,

		//internal version bigger
		version:		version.replace(/^5/, '6'),
		//showed for user (ignored in firefox)
		...(vendor != 'firefox' ? {
			version_name:	version,
		} : {}),

		name:			'Raindrop.io'+(!production?' (Dev)':''),
		description:	'__MSG_appDesc__',
		homepage_url:	'https://app.raindrop.io',
		author:			'Mussabekov Rustem',
		short_name:		'Raindrop.io',
		default_locale:	'en',

		...(vendor=='firefox' ? {
			browser_specific_settings: {
				gecko: {
					id: 'jid0-adyhmvsP91nUO8pRv0Mn2VKeB84@jetpack'
				}
			},
		} : {}),

		icons: {
			16: file(l, '../../../assets/brand/icon_16.png'),
			32: file(l, '../../../assets/brand/icon_32.png'),
			48: file(l, '../../../assets/brand/icon_48.png'),
			128: file(l, '../../../assets/brand/icon_128.png')
		},

		background: (
			(vendor == 'firefox' || vendor == 'safari' || vendor == 'safari-ios') ? {
				scripts: ['background.js'],
				...(vendor == 'safari' || vendor == 'safari-ios' ? {
					persistent: false
				} : {})
			} : {
				service_worker: 'background.js'
			}
		),

		action: {
			default_popup: vendor=='safari' ? 
				[
					file(l, '../../../assets/target/extension/action_in_iframe.html'),
					file(l, '../../../assets/target/extension/action_in_iframe.js'),
				][0] : 
				'index.html?action',
			default_icon: {
				//chrome based icon
				...(vendor == 'chrome' || vendor == 'opera' ? {
					16: file(l, '../../../assets/target/extension/action_chrome_16.png'),
					24: file(l, '../../../assets/target/extension/action_chrome_24.png'),
					32: file(l, '../../../assets/target/extension/action_chrome_32.png')
				} : {}),
				//safari icon
				...(vendor == 'safari' || vendor == 'safari-ios' ? {
					16: file(l, '../../../assets/target/extension/action_safari_16.png'),
					19: file(l, '../../../assets/target/extension/action_safari_19.png'),
					32: file(l, '../../../assets/target/extension/action_safari_32.png'),
					38: file(l, '../../../assets/target/extension/action_safari_38.png')
				} : {})
			},
			//firefox
			...(vendor == 'firefox' ? {
				theme_icons: [
					{'light': file(l, '../../../assets/target/extension/action_firefox_dark_16.png'), 'dark': file(l, '../../../assets/target/extension/action_firefox_light_16.png'), size: 16},
					{'light': file(l, '../../../assets/target/extension/action_firefox_dark_24.png'), 'dark': file(l, '../../../assets/target/extension/action_firefox_light_24.png'), size: 24},
					{'light': file(l, '../../../assets/target/extension/action_firefox_dark_32.png'), 'dark': file(l, '../../../assets/target/extension/action_firefox_light_32.png'), size: 32}
				]
			} : {})
		},

		permissions: [
			'contextMenus',
			'activeTab', //activeTab gives full host_permission
			'scripting',
			'tabs',
			'storage',
			...(vendor == 'chrome' ? ['sidePanel'] : [])
		],

		//dev
		...(production ? {} : {
			host_permissions: ['http://localhost:3000/*']
		}),

		[vendor == 'firefox' ? 'optional_permissions' : 'optional_host_permissions']: [
			'*://*/*'
		],

		omnibox: {
			keyword: 'rd'
		},

		// chrome_settings_overrides: {
		// 	search_provider: {
		// 		name: 'Raindrop.io',
		// 		is_default: false,
		// 		encoding: 'utf-8',
		// 		search_url: 'https://app.raindrop.io/my/0/{searchTerms}',
		// 		keyword: 'rd',
		// 		favicon_url: file(l, '../../../assets/brand/favicon.ico')
		// 	}
		// },

		commands: {
			_execute_action: {
				suggested_key: {
					default: 'Ctrl+Shift+E'
				}
			},
			save_page: {
				suggested_key: {
					default: vendor == 'firefox' ? 'Alt+Shift+S' : 'Ctrl+Shift+S'
				},
				description: '__MSG_savePageOrHighlight__'
			},
			open_raindrop: {
				description: '__MSG_openRaindrop__',
			},

			...(vendor == 'firefox' || vendor == 'opera' ? {
				_execute_sidebar_action: {
					description: '__MSG_openSidePanel__'
				}
			}: {}),
		},

		//sidebar
		...(vendor == 'chrome' ? {
			side_panel: {
				default_path: 'sidepanel.html'
			}
		} : {}),

		...(vendor == 'firefox' || vendor == 'opera' ? {
			sidebar_action: {
				default_panel: 'sidepanel.html',
				default_icon: {
					16: file(l, '../../../assets/target/extension/action_firefox_light_16.png'),
					24: file(l, '../../../assets/target/extension/action_firefox_light_24.png'),
					32: file(l, '../../../assets/target/extension/action_firefox_light_32.png')
				},
				...(vendor == 'firefox' ? {
					browser_style: false,
					open_at_install: false
				} : {})
			}
		}: {})
	}

	return { code: JSON.stringify(json, null, 2) };
}