import { createSelector } from 'reselect'
import _ from 'lodash-es'
import { getPath } from '../../helpers/collections'

const emptyArray = []

//(state, spaceId, filter) -> []
export const makeCollectionsSearch = ()=>createSelector(
	[
        ({collections={}})=>collections.items,
		({collections={}})=>collections.groups,
        (state, ignore)=>parseInt(ignore),
        (state, ignore, filter)=>filter,
		(state, ignore, filter, fullquery)=>fullquery,
    ],
	(items, groups, ignore, _filter, fullquery)=>{
		if (fullquery && fullquery != _filter) return emptyArray
		const filter = (_filter||'').toLowerCase().trim()
		if (!filter) return emptyArray

		const found = []

		_.forEach(items, ({ _id, title='', count, cover })=>{
			if (title.toLowerCase().includes(filter) &&
                _id != ignore)
				found.push({
                    _id,
                    title,
					cover,
                    count,
                    query: `collection:${_id} `,
					path: getPath(items, groups, _id, { group: true }).map(({title})=>title).join(' / ')
                })
		})

		return found.length ? 
			_.orderBy(
				found,
				({ title }) => title.toLowerCase().indexOf(filter)+title.toLowerCase(),
				'asc'
			) : 
			emptyArray
	}
)