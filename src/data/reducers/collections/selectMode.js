import _ from 'lodash'
import { blankSelectMode, getChildrens } from '../../helpers/collections'
import {
	COLLECTIONS_LOAD_REQ,
	COLLECTIONS_REFRESH_REQ,

	COLLECTIONS_SELECT_ONE,
	COLLECTIONS_UNSELECT_ONE,
	COLLECTIONS_SELECT_ALL,
	COLLECTIONS_UNSELECT_ALL,

	COLLECTIONS_SELECTED_MERGE,
    COLLECTIONS_SELECTED_REMOVE,
	COLLECTIONS_SELECTED_FAILED,
	
	COLLECTION_REMOVE_SUCCESS
} from '../../constants/collections'

function getChildIds(state, _id) {
	return getChildrens(_.values(state.items), { _id }, 0, true)
		.map(({ _id, item }) => _id || item._id)
}

export default function(state, action) {switch (action.type) {
    case COLLECTIONS_SELECT_ALL:{
		if (state.selectMode.enabled &&
			state.selectMode.working)
			return state

		let ids = []

		if (action.groupId){
			for(const group of state.groups)
				if (action.groupId == group._id)
					ids.push(...group.collections)
		} else
			ids = _.filter(
				_.map(state.items, ({ _id })=>_id),
				_id => _id > 0
			)

		return state
			.set('selectMode', blankSelectMode)
			.setIn(['selectMode', 'enabled'], true)
			.setIn(['selectMode', 'ids'], ids)
    }

	case COLLECTIONS_LOAD_REQ:
	case COLLECTIONS_REFRESH_REQ:
    case COLLECTIONS_UNSELECT_ALL:
		return state
			.set('selectMode', blankSelectMode)

	case COLLECTIONS_SELECT_ONE:{
		if (state.selectMode.enabled &&
			state.selectMode.working)
			return state

		if (action._id <= 0)
			return state

		const ids = [
			action._id,
			...(action.childrens ? getChildIds(state, action._id) : [])
		]

		//expand selected
		for(const _id of ids)
			state = state.setIn(['items', _id, 'expanded'], true)

		return state
			.set('selectMode', blankSelectMode)
			.setIn(['selectMode', 'enabled'], true)
			.setIn(['selectMode', 'ids'], _.uniq([...state.selectMode.ids, ...ids]))
	}

	case COLLECTIONS_UNSELECT_ONE:
	case COLLECTION_REMOVE_SUCCESS:{
		const ids = state.selectMode.ids.length ? 
			_.without(
				state.selectMode.ids, 
				...(Array.isArray(action._id) ? action._id : [action._id, ...(action.childrens ? getChildIds(state, action._id) : [])])
			)
			: []

		return state
			.setIn(['selectMode', 'ids'], ids)
			.setIn(['selectMode', 'enabled'], ids.length ? true : false)
			.setIn(['selectMode', 'working'], ids.length ? state.selectMode.working : '')
	}

	case COLLECTIONS_SELECTED_MERGE:
		return state.setIn(['selectMode', 'working'], 'merge')
	
	case COLLECTIONS_SELECTED_REMOVE:
		return state.setIn(['selectMode', 'working'], 'remove')

	case COLLECTIONS_SELECTED_FAILED:
		return state.setIn(['selectMode', 'working'], '')
}}