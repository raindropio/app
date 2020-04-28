import {
	FILTERS_LOAD_REQ
} from '../constants/filters'

//Loading
export const load = (spaceId)=>({
	type: FILTERS_LOAD_REQ,
	spaceId: String(spaceId)
})