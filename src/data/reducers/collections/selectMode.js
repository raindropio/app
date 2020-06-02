import _ from 'lodash'
import { blankSelectMode } from '../../helpers/collections'
import {
	COLLECTIONS_LOAD_REQ,
	COLLECTIONS_SELECT_ONE,
	COLLECTIONS_UNSELECT_ONE,
	COLLECTIONS_SELECT_ALL,
	COLLECTIONS_UNSELECT_ALL,
	COLLECTION_REMOVE_SUCCESS
} from '../../constants/collections'

export default function(state, action) {switch (action.type) {
    case COLLECTIONS_SELECT_ALL:{
		if (state.selectMode.enabled &&
			state.selectMode.working)
			return state

		let ids = []

		for(const group of state.groups)
			if (!action.groupId || action.groupId == group._id)
				ids.push(...group.collections)

		return state
			.set('selectMode', blankSelectMode)
			.setIn(['selectMode', 'enabled'], true)
			.setIn(['selectMode', 'ids'], ids)
    }

	case COLLECTIONS_LOAD_REQ:
    case COLLECTIONS_UNSELECT_ALL:{
		if (state.selectMode.enabled &&
			state.selectMode.working)
			return state

		return state
			.set('selectMode', blankSelectMode)
	}

	case COLLECTIONS_SELECT_ONE:{
		if (state.selectMode.enabled &&
			state.selectMode.working)
			return state

		if (action._id <= 0)
			return state

		return state
			.set('selectMode', blankSelectMode)
			.setIn(['selectMode', 'enabled'], true)
			.setIn(['selectMode', 'ids'], _.uniq([...state.selectMode.ids, action._id]))
	}

	case COLLECTIONS_UNSELECT_ONE:
	case COLLECTION_REMOVE_SUCCESS:{
		const ids = state.selectMode.ids.length ? _.without(state.selectMode.ids, action._id) : []

		return state
			.setIn(['selectMode', 'ids'], ids)
			.setIn(['selectMode', 'enabled'], ids.length?true:false)
	}
}}