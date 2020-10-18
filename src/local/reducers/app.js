import _ from 'lodash-es'
import { REHYDRATE } from 'redux-persist/src/constants'

import {
	APP_SET_THEME,
	APP_SET_APP_SIZE,
	APP_COLLECTIONS_SEARCH_RESULTS_HIDE
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

	case REHYDRATE:{
		const incoming = action.payload && action.payload.local||{}

		_.forEach(incoming, (val,key)=>{
			switch(key){
				case 'theme': state = setTheme(state, val); break
				case 'appSize': state = state.set('appSize', String(val)||'default'); break
			}
		})

		return state
	}
}}

const setTheme = (state, { app, sidebar, auto })=>{
	return state.set('theme', {
		app,
		sidebar: sidebar||app,
		auto: Boolean(auto)
	})
}