import { createSelector } from 'reselect'
import { getFilters } from './items'

const emptyArray = []

//(state, spaceId, filter) -> [{ ...filter, contains: true }]
export const makeFiltersAutocomplete = ()=>createSelector(
    [
        (state)=>getFilters(state, '0s'),
        (state, spaceId)=>parseInt(spaceId) ? getFilters(state, spaceId) : emptyArray,
        (state, spaceId, filter)=>filter,
    ],
    (global, collection, _filter, selected)=>{
        const filter = (_filter||'').trim().toLowerCase()
        
        return global
            .map(item => {
                if (collection.length && collection.some(({_id})=>_id == item._id))
                    return { ...item, contains: true }

                return item
            })
            .filter(item => {
                if (selected.includes(item._id)) return false
                if (selected.includes(item.query)) return false
                if (filter)
                    return  item._id.toLowerCase().includes(filter) ||
                            item.query.toLowerCase().includes(filter)

                return true
            })
	}
)