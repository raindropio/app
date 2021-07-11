import { createSelector } from 'reselect'

const emptyArray = []

//(state, spaceId, filter, fullquery*) -> []
export const makeOptions = ()=>createSelector(
    [
        (state, spaceId)=>spaceId,
        (state, spaceId, filter)=>filter,
        (state, spaceId, filter, fullquery)=>fullquery,
    ],
    (spaceId, filter, fullquery='')=>{
        //if (filter) return emptyArray

        return [
            ...(parseInt(spaceId) ? [
                {
                    _id: spaceId,
                    query: `incollection:${spaceId}`,
                    checked: false
                }
            ] : []),

            {
                _id: 'fulltext',
                query: 'fulltext:true ',
                checked: false
            },

            ...(fullquery && fullquery.trim().length > filter ? [
                {
                    _id: 'operator',
                    query: 'operator:or ',
                    checked: fullquery.includes('operator:or')
                }
            ] : [])
        ]
	}
)