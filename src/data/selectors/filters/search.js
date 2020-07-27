import { createSelector } from 'reselect'
import { getFilters } from './'
import { getSearch } from '../bookmarks'

//(state, spaceId, filter) -> []
export const makeFiltersSearch = ()=>createSelector(
    [
        getFilters,
        (state, spaceId, filter)=>filter,
        getSearch,
    ],
    (filters, _filter, _search)=>{
        const filter = (_filter||'').trim().toLowerCase()
        const search = (_search||'').trim().toLowerCase()

        return filters.filter(item => {
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