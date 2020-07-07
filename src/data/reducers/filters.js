import Immutable from 'seamless-immutable'
import _ from 'lodash-es'
import { blankSpace } from '../helpers/filters'

import {REHYDRATE} from 'redux-persist/src/constants'

import {
	FILTERS_LOAD_REQ, FILTERS_LOAD_SUCCESS, FILTERS_LOAD_ERROR
} from '../constants/filters'

import { TAG_RENAME_SUCCESS, TAG_REMOVE_SUCCESS, TAGS_REORDER } from '../constants/tags'

export default function(state = initialState, action={}){switch (action.type) {
	case REHYDRATE:{
		const { spaces={} } = action.payload && action.payload.filters||{}

		_.forEach(spaces, (space, _id)=>{
			if (!space.status || space.status != 'loaded') return
			state = state.setIn(['spaces', _id], space)
		})

		return state
	}

	case FILTERS_LOAD_REQ:{
		if (state.getIn(['spaces', action.spaceId, 'status']) == 'loading'){
			action.ignore = true
			return state
		}

		if (!state.spaces[action.spaceId])
			state = state.setIn(['spaces', action.spaceId], blankSpace)
		
		return state.setIn(['spaces', action.spaceId, 'status'],	'loading')
	}
	
	case FILTERS_LOAD_SUCCESS:{
		const { spaceId, type, ...items } = action

		return state
			.setIn(['spaces', spaceId],					items)
			.setIn(['spaces', spaceId, 'status'],		'loaded')
	}

	case FILTERS_LOAD_ERROR:{
		return state
			.setIn(['spaces', action.spaceId], 							blankSpace)
			.setIn(['spaces', action.spaceId, 'status'], 				'error')
	}

	//Update tags
	case TAG_RENAME_SUCCESS:{
		_.forEach(state.spaces, (space, spaceId)=>{
			const path=['spaces', spaceId, 'tags']

			state = state.setIn(path, state.getIn(path).map((item)=>{
				if (item._id==action.tagName)
					return item.set('_id', action.newName)
				return item
			}))
		})

		return state
	}

	//Remove tags
	case TAG_REMOVE_SUCCESS:{
		_.forEach(state.spaces, (space, spaceId)=>{
			const path=['spaces', spaceId, 'tags']

			state = state.setIn(path, state.getIn(path).filter((item)=>item._id!=action.tagName))
		})

		return state
	}

	//reorder
	case TAGS_REORDER:{
		_.forEach(state.spaces, (space, spaceId)=>{
			const path=['spaces', spaceId, 'tags']

			state = state.setIn(
				path, 
				_.orderBy(
					state.getIn(path)
						.map(item=>({ ...item, _title: item._id.toLowerCase() })),

					...(action.method == '-count' ?
						[
							[ 'count', '_title' ],
							[ 'desc', 'asc' ]
						] :
						[
							[ '_title' ],
							[ 'asc' ]
						]
					)
				)
			)
		})

		return state	
	}

	case 'RESET':{
		return initialState
	}

	default:
		return state;
}}

const initialState = Immutable({
	spaces: {},
})