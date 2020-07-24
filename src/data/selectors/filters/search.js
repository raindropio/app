import { createSelector } from 'reselect'
import { getFilters, getStatus } from './'
import { getSearch } from '../bookmarks'

//(state, spaceId, filter) -> []
export const makeFiltersSearch = ()=>createSelector(
    [
        getFilters,
        (state, spaceId, filter)=>filter,
        getSearch,
        getStatus
    ],
    (filters, _filter, search, status)=>{
        const filter = (_filter||'').trim().toLowerCase()

        return filters.filter(item => {
            if (status != 'loading' && search && search.includes(item.query))
                return false

            if (filter)
                return item._id.toLowerCase().includes(filter) ||
                item.query.toLowerCase().includes(filter)

            return true
        })
	}
)