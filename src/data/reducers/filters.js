import Immutable from 'seamless-immutable'
import _ from 'lodash-es'
import { blankSpace, normalizeItems } from '../helpers/filters'
import { REHYDRATE } from 'redux-persist/src/constants'
import { FILTERS_LOAD_REQ, FILTERS_LOAD_SUCCESS, FILTERS_LOAD_ERROR } from '../constants/filters'

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
		const { spaceId } = action

		return state
			.setIn(['spaces', spaceId],					blankSpace)
			.setIn(['spaces', spaceId, 'items'],		normalizeItems(action.items))
			.setIn(['spaces', spaceId, 'status'],		'loaded')
	}

	case FILTERS_LOAD_ERROR:{
		const { spaceId } = action

		return state
			.setIn(['spaces', spaceId],					blankSpace)
			.setIn(['spaces', spaceId, 'status'],		'error')
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