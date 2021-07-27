import { createSelector } from 'reselect'

//(state, spaceId, filter, fullquery) -> []
export const makeRecent = ()=>createSelector(
	[
        ({bookmarks={}})=>bookmarks.recent.search,
		(state, spaceId, filter, fullquery)=>fullquery,
    ],
	(recent, fullquery)=>{
		if (!fullquery) return recent

		return recent.filter(({query})=>query.startsWith(fullquery))
	}
)