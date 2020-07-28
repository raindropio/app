import {
	FILTERS_LOAD_REQ,
	FILTERS_AUTOLOAD,
} from '../constants/filters'

export const autoLoad = (spaceId, enabled=false)=>({
	type: FILTERS_AUTOLOAD,
	spaceId: String(spaceId),
	enabled
})

export const load = (spaceId, query={})=>({
	type: FILTERS_LOAD_REQ,
	spaceId: String(spaceId),
	query
})