import Immutable from 'seamless-immutable'
import _ from 'lodash-es'
import { blankSpace, normalizeItems } from '../helpers/filters'
import { REHYDRATE } from 'redux-persist/src/constants'
import { FILTERS_AUTOLOAD, FILTERS_LOAD_REQ, FILTERS_LOAD_SUCCESS, FILTERS_LOAD_ERROR } from '../constants/filters'

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

	case FILTERS_AUTOLOAD:{
		const { spaceId, enabled } = action

		return state.set(
			'autoLoad',
			enabled ?
				_.uniq([...state.autoLoad, spaceId]) :
				_.without(state.autoLoad, spaceId)
		)
	}

	case FILTERS_LOAD_REQ:{
		const { spaceId, query: { search = '' }, force=false } = action

		let space = state.spaces[spaceId] || blankSpace

		//nothing changed
		if (space.query.search == search && 
			space.status == 'loaded' &&
			!force){
			action.ignore = true
			return state
		}

		//set loading status
		space = space.set('status', 'loading')

		//clean if needed
		if (!search.startsWith(space.query.search))
			space = space.set('items', [])

		//new search query
		space = space.set('query', { search })
		
		return state.setIn(['spaces', action.spaceId],	space)
	}
	
	case FILTERS_LOAD_SUCCESS:{
		const { spaceId, items, query: { search = '' } } = action

		let space = (state.spaces[spaceId] || blankSpace)

		//prevent override
		if (space.query.search != search)
			return state

		space = space
			.set('items', normalizeItems(items))
			.set('status', 'loaded')

		return state.setIn(['spaces', action.spaceId],	space)
	}

	case FILTERS_LOAD_ERROR:{
		const { spaceId, query: { search = '' } } = action

		let space = (state.spaces[spaceId] || blankSpace)
		
		//prevent override
		if (space.query.search != search)
			return state
		
		space = space
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
	autoLoad: []
})