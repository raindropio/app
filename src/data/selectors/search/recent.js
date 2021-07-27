import { createSelector } from 'reselect'

const emptyArray = []

//(state, spaceId, filter, fullquery) -> []
export const makeRecent = ()=>createSelector(
	[
        ({bookmarks={}})=>bookmarks.recent.search,
		(state, spaceId, filter, fullquery)=>fullquery,
    ],
	(recent, fullquery)=>{
		if (!fullquery) return recent

		const filtered = recent.filter(({query})=>query.startsWith(fullquery))

		//do not show only one recent that exactly the same as full query
		if (filtered.length == 1 && filtered[0].query == fullquery)
			return emptyArray

		return filtered
	}
)