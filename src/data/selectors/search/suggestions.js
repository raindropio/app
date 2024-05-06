import { createSelector } from 'reselect'
import { makeFiltersSearch } from '../filters'
import { makeTagsSearch } from '../tags'
import { makeCollectionsSearch } from './collections'
import { makeOptions } from './options'

//(state, spaceId, filter, query) -> []
export const makeSuggestions = ()=>createSelector(
    [
        makeOptions(),
        makeFiltersSearch(),
        makeTagsSearch(),
        makeCollectionsSearch(),
        (state, spaceId, filter)=>filter,
    ],
    (options, filters, tags, collections, filter)=>{
        if (filter=='-') return []

        let suggestions = [...options, ...collections, ...tags, ...filters]

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