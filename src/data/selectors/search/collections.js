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
		(state, ignore, filter, query)=>query,
    ],
	(items, groups, ignore, _filter, _query)=>{
		const filter = (_query||_filter||'').toLowerCase().trim()
		if (!filter) return emptyArray

		const found = []

		_.forEach(items, ({ _id, title='', slug='', count, cover })=>{
			if (
				_id != ignore
				&& (
					title.toLowerCase().includes(filter) ||
					slug.toLowerCase().includes(filter)
				)
			)
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