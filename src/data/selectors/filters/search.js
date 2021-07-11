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

        return filter ? filters.filter(({ query }) => 
            query.toLowerCase().startsWith(filter) && !query.endsWith(':')
        ) : filters
	}
)