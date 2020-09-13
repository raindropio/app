const fs = require('fs')

function file({ emitFile }, filename) {
	const name = filename.split('/').pop()
	emitFile(name, fs.readFileSync(`${__dirname}/${filename}`))
	return name
}

module.exports = ({ vendor }, l) => {
	const json = {
		'manifest_version': 2,
		'name': 'Raindrop.io',
		'description': 'All In One Bookmark Manager',
		'homepage_url': 'https://raindrop.io',
		'author': 'Mussabekov Rustem',
		'short_name': 'Raindrop.io',
		'icons': {
			'16': file(l, '../assets/brand/icon_16.png'),
			'32': file(l, '../assets/brand/icon_32.png'),
			'48': file(l, '../assets/brand/icon_48.png'),
			'128': file(l, '../assets/brand/icon_128.png')
		},
		'browser_action': {
			'name': 'Raindrop.io',
			'default_icon': {
				'16': file(l, '../assets/extension/light-16.png'),
				'24': file(l, '../assets/extension/light-24.png'),
				'32': file(l, '../assets/extension/light-32.png')
			}
		}
	}

	//additional files
	file(l, '../assets/extension/dark-16.png')
	file(l, '../assets/extension/dark-16.png')
	file(l, '../assets/extension/dark-16.png')

	return { code: JSON.stringify(json, null, 2) };
}