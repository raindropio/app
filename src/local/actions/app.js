import {
	APP_SET_THEME,
} from '../constants'

export const setTheme = (name)=>({
	type: APP_SET_THEME,
	name
})