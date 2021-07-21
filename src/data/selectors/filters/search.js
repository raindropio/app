import { createSelector } from 'reselect'
import { getFilters } from './'

//(state, spaceId, filter) -> []
export const makeFiltersSearch = ()=>createSelector(
    [
        getFilters,
        (state, spaceId, filter)=>filter,
    ],
    (filters, _filter)=>{
        const filter = String(_filter||'').trimStart().toLowerCase()

        if (filter)
            return filters.filter(({ query }) => 
                query.toLowerCase().includes(filter) && !query.endsWith(':')
            )

        return filters
	}
)