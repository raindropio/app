import _ from 'lodash-es'
import { createSelector } from 'reselect'
import {
	blankSpace
} from '../helpers/filters'
import {getSearch} from './bookmarks/space'

//Filters by collection id
export const getFilters = ({filters}, spaceId)=>filters.spaces[spaceId] || blankSpace

export const makeFilters = ()=> createSelector(
	[getFilters, getSearch],
	(filters, search)=>{
		if (search.length){
			return {
				status: filters.status,
				types: filters.types.filter(({name})=>!search.find(({key})=>key==name)),
				tags: filters.tags.filter(({name})=>!search.find(({val})=>val==name))
			}
		}
		else
			return filters
	}
)