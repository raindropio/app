import _ from 'lodash-es'
import { REHYDRATE } from 'redux-persist/src/constants'
import localStorage from '~modules/localStorage'

import {
	APP_SET_THEME,
	APP_SET_APP_SIZE,
	APP_COLLECTIONS_SEARCH_RESULTS_HIDE,
	APP_TOGGLE_HIGHLIGHTS
} from '../constants'

export default function(state, action) {switch (action.type) {
	//Settings
	case APP_SET_THEME:
		state = setTheme(state, action)
		return state

	case APP_SET_APP_SIZE:
		return state.set('appSize', action.appSize||'default')

	case APP_COLLECTIONS_SEARCH_RESULTS_HIDE:
		return state.set('collectionsSearchResults', !state.collectionsSearchResults)

	case APP_TOGGLE_HIGHLIGHTS:
		return state.set('highlightsExpanded', !state.highlightsExpanded)

	case REHYDRATE:{
		const incoming = action.payload && action.payload.local||{}

		_.forEach(incoming, (val,key)=>{
			switch(key){
				case 'theme': state = setTheme(state, val); break
				case 'appSize': state = state.set('appSize', String(val)||'default'); break
				case 'highlightsExpanded': state = state.set('highlightsExpanded', val ? true : false); break
			}
		})

		return state
	}
}}

const setTheme = (state, { app, sidebar, auto })=>{
	const theme = {
		app,
		sidebar: sidebar||app,
		auto: Boolean(auto)
	}

	try{
		window.requestAnimationFrame(()=>
			localStorage.setItem('_theme', JSON.stringify(theme))
		)
	} catch(e) {}

	return state.set('theme', theme)
}