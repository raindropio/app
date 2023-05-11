import {
	APP_SET_THEME,
	APP_SET_APP_SIZE,
	APP_COLLECTIONS_SEARCH_RESULTS_HIDE,
	APP_TOGGLE_HIGHLIGHTS,
	APP_SET_VISITED_SPACE
} from '../constants'

export const setTheme = ({ app, sidebar, auto })=>({
	type: APP_SET_THEME,
	app, sidebar, auto
})

export const setAppSize = (appSize)=>({
	type: APP_SET_APP_SIZE,
	appSize
})

export const toggleCollectionsSearchResults = ()=>({
	type: APP_COLLECTIONS_SEARCH_RESULTS_HIDE
})

export const toggleHighlights = ()=>({
	type: APP_TOGGLE_HIGHLIGHTS
})

export const setVisitedSpace = ({ cId, search })=>({
	type: APP_SET_VISITED_SPACE,
	cId, 
	search
})