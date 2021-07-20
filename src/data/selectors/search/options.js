import { createSelector } from 'reselect'

const emptyArray = []

//(state, spaceId, filter, fullquery*, originalSpaceId*) -> []
export const makeOptions = ()=>createSelector(
    [
        (state, spaceId)=>spaceId,
        (state, spaceId, filter)=>filter,
        (state, spaceId, filter, fullquery)=>fullquery,
        (state, spaceId, filter, fullquery, originalSpaceId)=>originalSpaceId,
        ({collections={}})=>collections.items,
    ],
    (spaceId, filter, fullquery='', originalSpaceId, collections)=>{
        if (filter) return emptyArray

        const tokens = (fullquery.match(/\s/g) || []).filter(t=>t).length

        return [
            ...(tokens == 0 && parseInt(originalSpaceId||spaceId) && !fullquery.includes('local:collection') ? [
                {
                    ...collections[parseInt(originalSpaceId||spaceId)],
                    _id: 'localcollection',
                    query: 'local:collection ',
                    top: true
                }
            ] : []),

            ...(tokens > 1 && !fullquery.includes('match:OR') ? [
                {
                    _id: 'matchor',
                    query: 'match:OR ',
                    top: true
                }
            ] : [])
        ]
	}
)