import { createSelector } from 'reselect'
import { getFilters } from './items'
import { getSearch } from '../bookmarks'

//(state, spaceId, filter) -> []
export const makeFiltersSearch = ()=>createSelector(
    [
        getFilters,
        (state, spaceId, filter)=>filter,
        getSearch
    ],
    (filters, _filter, search)=>{
        const filter = (_filter||'').trim().toLowerCase()

        return filters.filter(item => {
            if (search && search.includes(item.query))
                return false

            if (filter)
                return item._id.toLowerCase().includes(filter) ||
                item.query.toLowerCase().includes(filter)

            return true
        })
	}
)