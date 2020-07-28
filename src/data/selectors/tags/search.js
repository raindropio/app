import { createSelector } from 'reselect'
import { getTags } from './items'

//(state, spaceId, filter) -> []
export const makeTagsSearch = ()=>createSelector(
    [
        getTags,
        (state, spaceId, filter)=>filter,
    ],
    (tags, _filter, _search)=>{
        const filter = (_filter||'').trim().toLowerCase()

        return filter ? tags.filter(({ query }) => 
            query.toLowerCase().includes(filter)
        ) : tags
	}
)