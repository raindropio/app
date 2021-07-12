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

        if (filter){
            let limit = filters.filter(({ query }) => 
                query.toLowerCase().includes(filter)
            )

            //keep incomplete token when it only one
            if (limit.length == 1)
                return limit

            //hide incomplete tokens
            return limit.filter(({ query })=>!query.endsWith(':'))
        }

        return filters
	}
)