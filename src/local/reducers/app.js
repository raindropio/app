import _ from 'lodash-es'
import { REHYDRATE } from 'redux-persist/src/constants'

import {
	APP_SET_THEME
} from '../constants'

export default function(state, action) {switch (action.type) {
	//Settings
	case APP_SET_THEME:
		return setTheme(state, action.name)

	case REHYDRATE:{
		const incoming = action.payload && action.payload.local||{}

		_.forEach(incoming, (val,key)=>{
			switch(key){
				case 'theme': state = setTheme(state, val); break
			}
		})

		return state
	}
}}

const setTheme = (state, name)=>{
	return state.set('theme', name)
}