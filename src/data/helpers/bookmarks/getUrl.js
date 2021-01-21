import { blankSpace } from './blankSpace'
import {SPACE_PER_PAGE} from '../../constants/bookmarks'
import _ from 'lodash-es'

const rules = [
	{ regex: /("#)([^#]*?)"/gmi, override_key: 'tag' },
    { regex: /(#)([^\s#]*)/gmi, override_key: 'tag' }, //if space /(#)([^\s#]*)/gmi
    { regex: /([\w.]+):([a-z0-9-]+)/gmi },
]

const hardcoded = [
    { find: '❤', key: 'important', val: '1' },
    { find: '☠', key: 'broken', val: '1' },
]

export const getUrl = (__id, query)=>{
	let id = parseInt(__id)||0

	const entities = _.compact(_.map(query||blankSpace.query, (val,key)=>{
		if (val)
			switch(key){
				case 'ignore':
					if (!id) {
						id = parseInt(val)
						return key+'='+1
					} else
						return undefined

				case 'page':
				case 'sort':
					return key+'='+encodeURIComponent(val);

				case 'search':
					if (val.length){
						let clean = String(val).trim()
						let parts = []

						//rules
						for(const { regex, override_key='' } of rules){
							let match

							while ((match = regex.exec(clean)) !== null) {
								const [_, key, val] = match
								
								if (val)
									parts.push({ key: override_key||key, val })
							}
							
							clean = clean.replace(regex, '')
						}

						//hardcoded
						for(const {find, key, val} of hardcoded)
							if (clean.includes(find)){
								parts.push({ key, val })
								clean = clean.replace(find, '')
							}

						if (clean.trim())
							parts.push({ key: 'word', val: clean.trim() })

						return 'search='+encodeURIComponent(JSON.stringify(parts))
					}
				break
			}
	}))
	entities.push('perpage='+SPACE_PER_PAGE)
	entities.push('version=2')

	return id+'?'+entities.join('&')
}