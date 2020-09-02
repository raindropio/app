import { createSelector } from 'reselect'
import { getTags } from './items'

//(state, spaceId, filter) -> []
export const makeTagsSearch = ()=>createSelector(
    [
        getTags,
        (state, spaceId, filter)=>filter,
    ],
    (tags, _filter, _search)=>{
        const filter = String(_filter||'').trimStart().toLowerCase()

        return filter ? tags.filter(({ query, _id }) => 
            query.toLowerCase().startsWith(filter) ||
            _id.toLowerCase().startsWith(filter)
        ) : tags
	}
)