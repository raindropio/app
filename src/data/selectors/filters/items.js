import { blankSpace } from '../../helpers/filters'
import { createSelector } from 'reselect'

//(state, spaceId)
export const getFilters = ({ filters }, spaceId)=>
    (
        filters.spaces[spaceId] ? filters.spaces[spaceId] : blankSpace
    ).items

export const getQuickFilters = createSelector(
    getFilters,
    (filters)=>
        filters.filter(({quick})=>quick)
)

export const getStatus = ({ filters }, spaceId)=>
    (
        filters.spaces[spaceId] ? filters.spaces[spaceId] : blankSpace
    ).status