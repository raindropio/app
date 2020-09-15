const fs = require('fs')
const config = require('~config')

function file({ emitFile }, filename) {
	const name = 'assets/'+filename.split('/').pop()
	emitFile(name, fs.readFileSync(`${__dirname}/${filename}`))
	return name
}

module.exports = ({ vendor, production=false }, l) => {
	const { version } = JSON.parse(fs.readFileSync(`${__dirname}/../../package.json`, 'utf-8'))

	const json = {
		manifest_version:2,
		version:		version.replace(/^5/, '6'), //internal version bigger
		version_name:	version, //showed for user

		name:			'Raindrop.io'+(!production?' (Dev)':''),
		description:	'All In One Bookmark Manager',
		homepage_url:	'https://raindrop.io',
		author:			'Mussabekov Rustem',
		short_name:		'Raindrop.io',

		icons: {
			16: file(l, '../assets/brand/icon_16.png'),
			32: file(l, '../assets/brand/icon_32.png'),
			48: file(l, '../assets/brand/icon_48.png'),
			128: file(l, '../assets/brand/icon_128.png')
		},

		background: {
			scripts: [
				file(l, '../../node_modules/webextension-polyfill/dist/browser-polyfill.js'),
				'assets/background.js'
			],
			...(vendor!='firefox' ? {'persistent': true} : {})
		},

		browser_action: {
			name: 'Raindrop.io',
			default_popup: 'index.html',
			default_icon: {
				16: file(l, '../assets/extension/light-16.png'),
				24: file(l, '../assets/extension/light-24.png'),
				32: file(l, '../assets/extension/light-32.png')
			}
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

	//additional files
	file(l, '../assets/extension/dark-16.png')
	file(l, '../assets/extension/dark-16.png')
	file(l, '../assets/extension/dark-16.png')

	return { code: JSON.stringify(json, null, 2) };
}