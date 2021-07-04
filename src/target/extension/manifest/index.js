const fs = require('fs')
const csp = require('~config/csp')
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
		manifest_version:2,

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

		icons: {
			16: file(l, '../../../assets/brand/icon_16.png'),
			32: file(l, '../../../assets/brand/icon_32.png'),
			48: file(l, '../../../assets/brand/icon_48.png'),
			128: file(l, '../../../assets/brand/icon_128.png')
		},

		background: {
			scripts: [
				'assets/background.js'
			],
			persistent: false
		},

		browser_action: {
			default_popup: vendor=='safari' || vendor=='firefox' ? 
				[
					file(l, '../../../assets/target/extension/browser_action_in_iframe.html'),
					file(l, '../../../assets/target/extension/browser_action_in_iframe.js'),
					file(l, '../../../assets/target/extension/browser_action_in_iframe.css')
				][0] : 
				'index.html?browser_action',
			default_icon: {
				//chrome based icon
				...(vendor == 'chrome' || vendor == 'opera' ? {
					16: file(l, '../../../assets/target/extension/action_chrome_16.png'),
					24: file(l, '../../../assets/target/extension/action_chrome_24.png'),
					32: file(l, '../../../assets/target/extension/action_chrome_32.png')
				} : {}),
				//safari icon
				...(vendor == 'safari' ? {
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
			'activeTab',
			...(production ? [] : ['http://localhost:3000/*'])
		],

		optional_permissions: [
			'tabs'
		],

		omnibox: {
			keyword: 'rd'
		},

		commands: {
			_execute_browser_action: {
				suggested_key: {
					default: 'Ctrl+Shift+E',
					windows: 'Ctrl+Shift+E',
					mac: 'Command+Shift+E',
					chromeos: 'Ctrl+Shift+E',
					linux: 'Ctrl+Shift+E'
				}
			},
			save_page: {
				suggested_key: {
					default: 'Ctrl+Shift+S',
					windows: 'Ctrl+Shift+S',
					mac: 'Command+Shift+S',
					chromeos: 'Ctrl+Shift+S',
					linux: 'Ctrl+Shift+S'
				},
				description: '__MSG_savePage__'
			},
			open_raindrop: {
				description: '__MSG_openRaindrop__',
			},

			...(vendor == 'firefox' || vendor == 'opera' ? {
				_execute_sidebar_action: {
					suggested_key: {
						default: 'Ctrl+E',
						windows: 'Ctrl+E',
						mac: 'MacCtrl+E',
						chromeos: 'Ctrl+E',
						linux: 'Ctrl+E'
					},
					description: '__MSG_openSidebar__'
				}
			}: {}),
		},

		...(vendor == 'firefox' || vendor == 'opera' ? {
			sidebar_action: {
				default_panel: 'index.html?sidebar',
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
		}: {}),

		//firefox review not pass if csp have custom domains in script-src
		...(vendor != 'firefox' ? {
			content_security_policy: `script-src 'self' ${csp.hosts} ${!production?'\'unsafe-eval\'':''}; object-src 'none';`
		} : {}),
	}

	return { code: JSON.stringify(json, null, 2) };
}