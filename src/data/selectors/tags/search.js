import { createSelector } from 'reselect'
import _ from 'lodash'
import { getTags } from './items'

//(state, spaceId, filter) -> []
export const makeTagsSearch = ()=>createSelector(
    [
        getTags,
        (state, spaceId, filter)=>filter,
    ],
    (tags, _filter)=>{
        const filter = String(_filter||'').trimStart().toLowerCase().replace(/^#/,'')

        //filter and order by score
        return filter ? _.orderBy(
            tags.filter(({ query, _id }) => 
                (query||_id).toLowerCase().includes(filter)
            ),
            ({ query, _id }) => (
                (query||_id).toLowerCase().indexOf(filter)+_id.toLowerCase()
            ),
            'asc'
        ) : tags
	}
)