import _ from 'lodash-es'
import { REHYDRATE } from 'redux-persist/src/constants'
import { USER_LOAD_SUCCESS, USER_UPDATE_SUCCESS, USER_UPDATE_REQ } from '../constants/user'
import Immutable from 'seamless-immutable'

export default function(state = initialState, action){switch (action.type) {
	case REHYDRATE:
	case USER_LOAD_SUCCESS:
	case USER_UPDATE_REQ:
	case USER_UPDATE_SUCCESS:{
		const changed = action.user && action.user.config || (action.payload && action.payload.config||{})

		_.forEach(
			initialState,
			(val,key)=>{
				if (typeof changed[key] != 'undefined')
					state = mutate(state, key, changed[key])
			}
		)

		return state
	}

	case 'RESET':{
		return state.merge(_.omit(initialState, safeKeys))
	}

	default:
		return state
}}

const mutate = (state, key='', val='')=>{
	let modified
	switch(typeof initialState[key]){
		case 'string':	modified = String(val || ''); break
		case 'number':	modified = parseInt(val || 0); break
		case 'boolean':	modified = Boolean(val); break
		case 'object':
			switch(initialState[key].constructor) {
				case Array: if (val.constructor == Array) modified = val; break
				case Object: if (val.constructor == Object) modified = val; break
			}
		break
		default:		return state //ignore
	}
	return state.set(key, modified)
}

const initialState = Immutable({
	lang:					'', //should be empty!!
	last_collection:		0,

	raindrops_view:			'',
	raindrops_sort:			'sort',
	raindrops_hide:			[],
	raindrops_grid_cover_size:	2,
	raindrops_list_cover_size:	1,
	raindrops_list_cover_right:	false,
	raindrops_click:		'preview',
	raindrops_buttons:		[],
	raindrops_search_by_score:true,
	
	tags_sort:				'_id',
	tags_hide:				false,
	filters_hide:			false,
	nested_view_legacy:		false,

	font_size: 				0,
	font_color: 			'',
	font_family: 			'',

	broken_level:			'',

	add_default_collection: 0, //last_used
	add_auto_save:			false,
	mobile_add_auto_save:	false,
	
	browser_extension_mode: 'mini_app',

	acknowledge:			[]
})

//this keys can be kept untouched on reset
//useful when they configured before user login
const safeKeys = [
	'lang',
	'add_default_collection',
	'add_auto_save',
	'browser_extension_mode'
]