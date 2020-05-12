import { createSelector } from 'reselect'
import {
	blankSpace
} from '../helpers/filters'
import {getSearch} from './bookmarks/space'

//Filters by collection id
export const getFilters = ({filters={}}, spaceId)=>filters.spaces[spaceId] || blankSpace

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
	(filters, config)=>{
		return [
			{ type: 'section', _id: 'types', hidden: config.sidebar_hide_types },
			...( config.sidebar_hide_types ? [] : [
				{ type: 'status', _id: 'important', ...filters.important },
				{ type: 'status', _id: 'broken', ...filters.broken },
				...filters.types.map(type=>({...type, type: 'type'}))
			] ),
			
			{ type: 'section', _id: 'tags', hidden: config.sidebar_hide_tags },
			...( config.sidebar_hide_tags ? [] : [
				...filters.tags.map(tag=>({...tag, type: 'tag'})),
				{ type: 'status', _id: 'notag', ...filters.notag }
			] )
		]
	}
)