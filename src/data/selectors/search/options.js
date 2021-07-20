import { createSelector } from 'reselect'

const emptyArray = []

const getInCollection = createSelector(
    [
        (state, spaceId)=>spaceId,
        (state, spaceId, filter, fullquery)=>fullquery,
        (state, spaceId, filter, fullquery, originalSpaceId)=>originalSpaceId,
        ({collections={}})=>collections.items,
    ],
    (spaceId, fullquery, originalSpaceId, collections)=>{
        const _id = parseInt(originalSpaceId||spaceId)
        if (!_id) return emptyArray
        if (fullquery.includes('local:collection')) return emptyArray

        const collection = collections[parseInt(originalSpaceId||spaceId)]
        if (!collection) return emptyArray

        return [{
            ...collection,
            _id: 'localcollection',
            query: 'local:collection ',
            top: true
        }]
    }
)

const getMatchOr = createSelector(
    [
        (state, spaceId)=>spaceId,
        (state, spaceId, filter)=>filter,
        (state, spaceId, filter, fullquery)=>fullquery
    ],
    (spaceId, filter, fullquery='')=>{
        const tokens = (fullquery.match(/\s/g) || []).filter(t=>t).length

        if (tokens <= 1) return emptyArray
        if (fullquery.includes('match:OR')) return emptyArray

        return [
            {
                _id: 'matchor',
                query: 'match:OR ',
                top: true
            }
        ]
	}
)

//(state, spaceId, filter, fullquery*, originalSpaceId*) -> []
export const makeOptions = ()=>createSelector(
    [
        (state, spaceId, filter)=>filter,
        getInCollection,
        getMatchOr
    ],
    (filter, inCollection, matchOr)=>{
        if (filter) return emptyArray
        
        const options = [...inCollection, ...matchOr]
        if (!options.length) return emptyArray

        return options
    }
)