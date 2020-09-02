import Immutable from 'seamless-immutable'
import { REHYDRATE } from 'redux-persist/src/constants'
import { COVERS_LOAD_REQ, COVERS_LOAD_SUCCESS, COVERS_LOAD_ERROR } from '../constants/covers'

export default function(state = initialState, action){switch (action.type) {
	case REHYDRATE:{
		const { covers={} } = action.payload||{}

		if (covers.status == 'loaded' &&
			covers.query == '')
			return covers.set('fromCache', true)

		return state
	}

	//Load
	case COVERS_LOAD_REQ:{
		if (state.query != action.query)
			state = state.set('items', initialState.items)
		
		return state
			.set('status', 'loading')
			.set('query', String(action.query||''))
	}

	case COVERS_LOAD_SUCCESS:{
		return state
			.set('status', 'loaded')
			.set('items', action.items)
	}

	case COVERS_LOAD_ERROR:{
		return state
			.set('status', 'error')
			.set('items', initialState.items)
	}

	case 'RESET':{
		return initialState
	}

	default:
		return state;
}}

const initialState = Immutable({
	fromCache: false,
	status: 'idle', //idle/loading/error/loaded
	items: [],
	query: ''
})