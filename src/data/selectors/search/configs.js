import { createSelector } from 'reselect'

const emptyArray = []

//(state, spaceId, filter, fullquery*) -> []
export const makeConfigs = ()=>createSelector(
    [
        (state, spaceId)=>spaceId,
        (state, spaceId, filter)=>filter,
        (state, spaceId, filter, fullquery)=>fullquery,
        (state)=>state.config
    ],
    (spaceId, filter, fullquery='', { raindrops_search_incollection })=>{
        if (filter) return emptyArray

        const tokens = (fullquery.match(/\s/g) || []).length

        return [
            ...(parseInt(spaceId) ? [
                {
                    _id: 'incollection',
                    config: 'raindrops_search_incollection',
                    checked: raindrops_search_incollection
                }
            ] : []),

            ...(tokens > 1 && !fullquery.includes('match:OR') ? [
                {
                    _id: 'matchor',
                    query: 'match:OR ',
                    checked: fullquery.includes('match:OR')
                }
            ] : [])
        ]
	}
)