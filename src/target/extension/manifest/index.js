const fs = require('fs')
const config = require('~config')

function file({ emitFile }, filename) {
	const name = 'assets/'+filename.split('/').pop()
	emitFile(name, fs.readFileSync(`${__dirname}/${filename}`))
	return name
}

module.exports = ({ vendor, production=false }, l) => {
	const { version } = JSON.parse(fs.readFileSync(`${__dirname}/../../../../package.json`, 'utf-8'))

	const json = {
		manifest_version:2,

		//internal version bigger
		version:		version.replace(/^5/, '6'),
		//showed for user (ignored in firefox)
		...(vendor != 'firefox' ? {
			version_name:	version,
		} : {}),

		name:			'Raindrop.io'+(!production?' (Dev)':''),
		description:	'All In One Bookmark Manager',
		homepage_url:	'https://app.raindrop.io',
		author:			'Mussabekov Rustem',
		short_name:		'Raindrop.io',

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
			persistent: true
		},

		browser_action: {
			default_popup: 'index.html',
			default_icon: {
				//chrome based icon
				...(vendor == 'chrome' || vendor == 'opera' ? {
					16: file(l, '../../../assets/target/extension/button_16.png'),
					24: file(l, '../../../assets/target/extension/button_24.png'),
					32: file(l, '../../../assets/target/extension/button_32.png')
				} : {}),
				//safari icon
				...(vendor == 'safari' ? {
					16: file(l, '../../../assets/target/extension/button_solid_16.png'),
					24: file(l, '../../../assets/target/extension/button_solid_24.png'),
					32: file(l, '../../../assets/target/extension/button_solid_32.png')
				} : {})
			},
			//firefox
			...(vendor == 'firefox' ? {
				theme_icons: [
					{'light': file(l, '../../../assets/target/extension/button_dark_16.png'), 'dark': file(l, '../../../assets/target/extension/button_light_16.png'), size: 16},
					{'light': file(l, '../../../assets/target/extension/button_dark_24.png'), 'dark': file(l, '../../../assets/target/extension/button_light_24.png'), size: 24},
					{'light': file(l, '../../../assets/target/extension/button_dark_32.png'), 'dark': file(l, '../../../assets/target/extension/button_light_32.png'), size: 32}
				]
			} : {})
		},

		permissions: [
			'contextMenus',
			'notifications',
			'activeTab',
			'https://*.raindrop.io/',
			'https://*.rdl.ink/'
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
					default: 'Ctrl+Shift+O',
					windows: 'Ctrl+Shift+O',
					mac: 'Command+Shift+O',
					chromeos: 'Ctrl+Shift+O',
					linux: 'Ctrl+Shift+O'
				},
				description: 'Save page'
			}
		},

		options_ui: {
			page: 'index.html#/settings'
		},

		content_security_policy: `script-src 'self' ${config.csp.hosts} ${!production?'\'unsafe-eval\'':''}; object-src 'self';`
	}

	return { code: JSON.stringify(json, null, 2) };
}