import { CONFIG_SET_LASTCOLLECTION } from '../constants/config'
import { USER_UPDATE_REQ } from '../constants/user'

//set('key', val) or set({ obj... })
export const set = (key, val)=>({
	type: USER_UPDATE_REQ,
	user: {
		config: typeof key == 'object' ?
			key : 
			{ [key]: val }
	}
})

export const setLastCollection = (spaceId)=>({
	type: CONFIG_SET_LASTCOLLECTION,
	spaceId
})

export const hideSection = (section, value)=>({
	type: USER_UPDATE_REQ,
	user: {
		config: {
			[`${section}_hide`]: value
		}
	}
})