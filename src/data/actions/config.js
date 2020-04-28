import { CONFIG_SET_LASTCOLLECTION } from '../constants/config'

export const setLastCollection = (spaceId)=>({
	type: CONFIG_SET_LASTCOLLECTION,
	spaceId
})