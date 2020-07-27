import _ from 'lodash'
import { blankSpace, normalizeTags } from '../../helpers/tags'
import { REHYDRATE } from 'redux-persist/src/constants'
import { FILTERS_LOAD_REQ } from '../../constants/filters'
import { TAGS_LOAD_SUCCESS, TAGS_LOAD_ERROR, TAGS_REORDER } from '../../constants/tags'

export default function(state, action={}){switch (action.type) {
	case REHYDRATE:{
		const { spaces={} } = action.payload && action.payload.tags||{}

		_.forEach(spaces, (space, _id)=>{
			if (!space.status || space.status != 'loaded') return
			state = state.setIn(['spaces', _id], space)
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
			.set('tags', [])
		
		return state.setIn(['spaces', action.spaceId],	space)
	}
	
	case TAGS_LOAD_SUCCESS:{
		const { spaceId, tags } = action

		let space = (state.spaces[spaceId] || blankSpace)
			.set('tags', normalizeTags(tags))
			.set('status', 'loaded')

		return state.setIn(['spaces', action.spaceId],	space)
	}

	case TAGS_LOAD_ERROR:{
		const { spaceId } = action

		let space = (state.spaces[spaceId] || blankSpace)
			.set('items', [])
			.set('status', 'error')

		return state.setIn(['spaces', action.spaceId],	space)
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
}}