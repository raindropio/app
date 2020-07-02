import {
	APP_SET_THEME,
	APP_SET_APP_SIZE,
	APP_COLLECTIONS_SEARCH_RESULTS_HIDE,
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

export const toggleCollectionsSearchResults = ()=>({
	type: APP_COLLECTIONS_SEARCH_RESULTS_HIDE
})