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

			state = state.setIn(
				['spaces', _id],
				space
			)
		})

		return state
	}

	case FILTERS_LOAD_REQ:{
		const { spaceId, force=false } = action

		let space = state.spaces[spaceId] || blankSpace

		//loading already
		if (!force && space.status == 'loading'){
			action.ignore = true
			return state
		}

		//set loading status
		space = space
			.set('status', 'loading')
			.set('items', [])
		
		return state.setIn(['spaces', action.spaceId],	space)
	}
	
	case FILTERS_LOAD_SUCCESS:{
		const { spaceId, items } = action

		let space = (state.spaces[spaceId] || blankSpace)
			.set('items', normalizeItems(items))
			.set('status', 'loaded')

		return state.setIn(['spaces', action.spaceId],	space)
	}

	case FILTERS_LOAD_ERROR:{
		const { spaceId } = action

		let space = (state.spaces[spaceId] || blankSpace)
			.set('items', [])
			.set('status', 'error')

		return state.setIn(['spaces', action.spaceId],	space)
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