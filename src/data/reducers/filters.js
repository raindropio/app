import Immutable from 'seamless-immutable'
import _ from 'lodash-es'
import {
	normalizeArray, normalizeEntity, blankSpace
} from '../helpers/filters'

import {REHYDRATE} from 'redux-persist/src/constants'

import {
	FILTERS_LOAD_REQ, FILTERS_LOAD_SUCCESS, FILTERS_LOAD_ERROR
} from '../constants/filters'

import {
	TAG_RENAME_SUCCESS, TAG_REMOVE_SUCCESS
} from '../constants/tags'

export default function(state = initialState, action={}){switch (action.type) {
	case REHYDRATE:{
		const { spaces={} } = action.payload && action.payload.filters||{}

		if (spaces[0])
			state = state.setIn(['spaces', 0], spaces[0])

		return state
	}

	case FILTERS_LOAD_REQ:{
		return state
			.setIn(['spaces', action.spaceId, 'status'],	blankSpace.status)
	}
	
	case FILTERS_LOAD_SUCCESS:{
		return state
			.setIn(['spaces', action.spaceId, 'status'], 				'loaded')
			.setIn(['spaces', action.spaceId, 'tags'], 					normalizeArray(action.tags))
			.setIn(['spaces', action.spaceId, 'types'], 				[
				...(action.important ? [{name: 'important', count: action.important}] : []),
				...normalizeArray(action.types),
				...(action.broken ? [{name: 'broken', count: action.broken}] : []),
				//...(action.best ? [{name: 'best'}] : []),
			])
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
				if (item.name==action.tagName)
					return item.set('name', action.newName)
				return item
			}))
		})

		return state
	}

	//Remove tags
	case TAG_REMOVE_SUCCESS:{
		_.forEach(state.spaces, (space, spaceId)=>{
			const path=['spaces', spaceId, 'tags']

			state = state.setIn(path, state.getIn(path).filter((item)=>item.name!=action.tagName))
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