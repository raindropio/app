import { createSelector } from 'reselect'
import { blankSpace } from '../helpers/filters'
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
				//important
				...(filters.important && filters.important.count ? [{
					type: 'status', 
					_id: 'important',
					query: '❤',
					...filters.important
				}] : []),
				//each type
				...filters.types.map(type=>({
					...type,
					query: `type:${type._id}`,
					type: 'type'
				})),
				//broken
				...(filters.broken && filters.broken.count ? [{
					type: 'status',
					_id: 'broken',
					query: '☠',
					...filters.broken
				}] : []),
			] ),
			
			{ type: 'section', _id: 'tags', hidden: config.sidebar_hide_tags },
			...( config.sidebar_hide_tags ? [] : [
				//tags
				...filters.tags.map(tag=>({
					...tag,
					query: tag._id.includes(' ') ? `"#${tag._id}"` : `#${tag._id}`,
					type: 'tag'
				})),

				//notag
				...(filters.notag && filters.notag.count ? [{
					type: 'status',
					_id: 'notag',
					query: 'notag:1',
					...filters.notag
				}] : [])
			] )
		]
	}
)