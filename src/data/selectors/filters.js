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

export const makeFlatFilters = ()=> createSelector(
	[getFilters, state=>state.config],
	(filters, config)=>[
		...(
			filters.types.length ? [
				{ type: 'section', _id: 'types', hidden: config.sidebar_hide_types },
				...( config.sidebar_hide_types ? [] : filters.types.map(type=>({...type, type: 'type'})) )
			] : []
		),
		
		...(
			filters.tags.length ? [
				{ type: 'section', _id: 'tags', hidden: config.sidebar_hide_tags },
				...( config.sidebar_hide_tags ? [] : filters.tags.map(tag=>({...tag, type: 'tag'})) )
			] : []
		),
	]
)