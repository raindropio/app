import { createSelector } from 'reselect'

const emptyArray = []

const getMatchOr = createSelector(
    [
        (state, spaceId)=>spaceId,
        (state, spaceId, filter)=>filter,
        (state, spaceId, filter, fullquery)=>fullquery
    ],
    (spaceId, filter, fullquery='')=>{
        const tokens = (fullquery.match(/\s/g) || []).filter(t=>(t||'').trim()).length

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

//(state, spaceId, filter, fullquery*) -> []
export const makeOptions = ()=>createSelector(
    [
        (state, spaceId, filter)=>filter,
        getMatchOr
    ],
    (filter, matchOr)=>{
        if (filter) return emptyArray
        
        const options = [...matchOr]
        if (!options.length) return emptyArray

        return options
    }
)