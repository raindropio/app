import { createSelector } from 'reselect'
import { getTags } from './items'
import { getSearch } from '../bookmarks'

//(state, spaceId, filter) -> []
export const makeTagsSearch = ()=>createSelector(
    [
        getTags,
        (state, spaceId, filter)=>filter,
        getSearch,
    ],
    (tags, _filter, _search)=>{
        const filter = (_filter||'').trim().toLowerCase()
        const search = (_search||'').trim().toLowerCase()

        return tags.filter(item => {
            const query = item.query.toLowerCase()

            if (search && search.includes(query))
                return false

            if (filter)
                return item._id.toLowerCase().includes(filter) ||
                query.includes(filter)

            return true
        })
	}
)