import { createSelector } from 'reselect'

const emptyArray = []

//(state, spaceId, filter, fullquery*) -> []
export const makeOptions = ()=>createSelector(
    [
        (state, spaceId)=>spaceId,
        (state, spaceId, filter)=>filter,
        (state, spaceId, filter, fullquery)=>fullquery,
        (state)=>state.config
    ],
    (spaceId, filter, fullquery='', { raindrops_search_fulltext, raindrops_search_incollection })=>{
        if (filter) return emptyArray

        const tokens = (fullquery.match(/\s/g) || []).length

        return [
            ...(parseInt(spaceId) ? [
                {
                    _id: 'incollection',
                    query: 'config:raindrops_search_incollection ',
                    checked: raindrops_search_incollection
                }
            ] : []),

            {
                _id: 'fulltext',
                query: 'config:raindrops_search_fulltext ',
                checked: raindrops_search_fulltext
            },

            ...(tokens > 1 ? [
                {
                    _id: 'operator',
                    query: 'operator:or ',
                    checked: fullquery.includes('operator:or')
                }
            ] : [])
        ]
	}
)