import { createSelector } from 'reselect'
import { getTags } from './items'
import { getSearch } from '../bookmarks'

//(state, spaceId, filter) -> []
export const makeTagsSearch = ()=>createSelector(
    [
        getTags,
        (state, spaceId, filter)=>filter,
        getSearch
    ],
    (tags, _filter, search)=>{
        const filter = (_filter||'').trim().toLowerCase()

        return tags.filter(item => {
            if (search && search.includes(item.query))
                return false

            if (filter)
                return item._id.toLowerCase().includes(filter) ||
                item.query.toLowerCase().includes(filter)

            return true
        })
	}
)