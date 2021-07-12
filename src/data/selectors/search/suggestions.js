import { createSelector } from 'reselect'
import { makeFiltersSearch } from '../filters'
import { makeTagsSearch } from '../tags'
import { makeCollectionsSearch } from './collections'

//(state, spaceId, filter) -> []
export const makeSuggestions = ()=>createSelector(
    [
        makeFiltersSearch(),
        makeTagsSearch(),
        makeCollectionsSearch(),
        (state, spaceId, filter)=>filter,
    ],
    (filters, tags, collections, filter)=>{
        if (filter=='-') return []

        let suggestions = [...collections, ...tags, ...filters]

        //keep only top level tokens
        //group multiple as single token
        if (!filter)
            return suggestions.filter(({top})=>top)

        if (filter && !filter.includes('#') && !filter.includes(':') &&
            suggestions.length)
            return [
                { _id: 'current', query: filter+' ' },
                ...suggestions
            ]

        return suggestions
	}
)