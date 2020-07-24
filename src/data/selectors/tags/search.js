import { createSelector } from 'reselect'
import { getTags } from './items'
import { getStatus } from '../filters'
import { getSearch } from '../bookmarks'

//(state, spaceId, filter) -> []
export const makeTagsSearch = ()=>createSelector(
    [
        getTags,
        (state, spaceId, filter)=>filter,
        getSearch,
        getStatus
    ],
    (tags, _filter, search, status)=>{
        const filter = (_filter||'').trim().toLowerCase()

        return tags.filter(item => {
            if (status != 'loading' && search && search.includes(item.query))
                return false

            if (filter)
                return item._id.toLowerCase().includes(filter) ||
                item.query.toLowerCase().includes(filter)

            return true
        })
	}
)