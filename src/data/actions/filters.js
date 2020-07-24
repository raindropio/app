import {
	FILTERS_LOAD_REQ,
	FILTERS_AUTOLOAD
} from '../constants/filters'

//Loading
export const load = (spaceId)=>({
	type: FILTERS_LOAD_REQ,
	spaceId: String(spaceId)
})

export const autoLoad = (spaceId, enabled=false)=>({
	type: FILTERS_AUTOLOAD,
	spaceId: String(spaceId),
	enabled
})