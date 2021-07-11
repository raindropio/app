import { blankSpace } from './blankSpace'
import {SPACE_PER_PAGE} from '../../constants/bookmarks'
import _ from 'lodash-es'

export const getUrl = (__id, query)=>{
	let id = parseInt(__id)||0

	const entities = _.compact(_.map(query||blankSpace.query, (val,key)=>{
		if (val)
			switch(key){
				case 'page':
				case 'sort':
					return key+'='+encodeURIComponent(val);

				case 'search':
					return key+'='+encodeURIComponent(val);
			}
	}))
	entities.push('perpage='+SPACE_PER_PAGE)
	entities.push('version=2')

	return id+'?'+entities.join('&')
}