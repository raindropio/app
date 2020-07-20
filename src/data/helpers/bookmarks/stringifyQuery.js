import { blankSpace } from './blankSpace'
import {SPACE_PER_PAGE} from '../../constants/bookmarks'
import _ from 'lodash-es'

const rules = [
	{ regex: /("#)([^#]*)"/gmi, override_key: 'tag' },
    { regex: /(#)([^\s#]*)/gmi, override_key: 'tag' }, //if space /(#)([^\s#]*)/gmi
    { regex: /([\w.]+):([a-z0-9]+)/gmi },
]

const hardcoded = [
    { find: '❤', key: 'important', val: '1' },
    { find: '☠', key: 'broken', val: '1' },
]

export const stringifyQuery = (query)=>{
	const entities = _.compact(_.map(query||blankSpace.query, (val,key)=>{
		if (val)
			switch(key){
				case 'page':
				case 'sort':
				case 'ignore':
					return key+'='+encodeURIComponent(val);
				case 'search':
					if (val.length){
						let clean = String(val).trim()
						let parts = []

						//rules
						for(const { regex, override_key='' } of rules){
							for(const [_, key, val] of clean.matchAll(regex))
								if (val)
									parts.push({ key: override_key||key, val })
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

	return '?'+entities.join('&')
}