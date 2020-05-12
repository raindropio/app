import { blankSpace } from './blankSpace'
import {SPACE_PER_PAGE} from '../../constants/bookmarks'
import _ from 'lodash-es'

const rules = [
    { regex: /(#)([^\s#]*)/gmi, override_key: 'tag' },
    { regex: /(\w+):(.+)/gmi },
]

const hardcoded = [
    { find: '❤', key: 'important', val: '1' },
    { find: '☠', key: 'broken', val: '1' },
]

export const getSpaceQuery = ({spaces={}}, spaceId)=>{
	if (typeof spaces[spaceId] == 'undefined')
		return {string: parseInt(spaceId), object:blankSpace.query}

	const query = spaces[spaceId].query || blankSpace.query
	const entities = _.compact(_.map(query, (val,key)=>{
		if (val)
			switch(key){
				case 'page':
				case 'sort':
					return key+'='+encodeURIComponent(val);
				case 'search':
					if (val.length){
						let query = String(val)
						let parts = []

						//rules
						for(const { regex, override_key='' } of rules){
							for(const [_, key, val] of query.matchAll(regex))
								parts.push({ key: override_key||key, val })
							query = query.replace(regex, '')
						}

						//hardcoded
						for(const {find, key, val} of hardcoded)
							if (query.includes(find)){
								parts.push({ key, val })
								query = query.replace(find, '')
							}

						if (query.trim())
							parts.push({ key: 'word', val: query.trim() })

						return 'search='+encodeURIComponent(JSON.stringify(parts))
					}
				break
			}
	}))
	entities.push('perpage='+SPACE_PER_PAGE)

	return {string: parseInt(spaceId)+'?'+entities.join('&'), object: query}
}