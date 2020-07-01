import {
	APP_SET_THEME,
	APP_SET_APP_SIZE,
} from '../constants'

export const setTheme = (name, autoTheme=true)=>({
	type: APP_SET_THEME,
	name,
	autoTheme
})

export const setAppSize = (appSize)=>({
	type: APP_SET_APP_SIZE,
	appSize
})