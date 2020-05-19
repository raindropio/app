import _ from 'lodash-es'

import { blankSelectMode, blankSpace } from '../../helpers/bookmarks'

import {
	SELECT_MODE_ENABLE,
	SELECT_MODE_DISABLE,
	SELECT_MODE_SELECT_BOOKMARK,
	SELECT_MODE_UNSELECT_BOOKMARK,
	SELECT_MODE_SELECT_ALL,
	SELECT_MODE_UNSELECT_ALL,

	SPACE_LOAD_REQ,
	SPACE_RELOAD_REQ,

	BOOKMARK_REMOVE_SUCCESS
} from '../../constants/bookmarks'

export default function(state, action) {switch (action.type) {
	case SELECT_MODE_ENABLE:{
		return state
			.set('selectMode', blankSelectMode)
			.setIn(['selectMode', 'enabled'], true)
			.setIn(['selectMode', 'spaceId'], action.spaceId)
			.setIn(['selectMode', 'ids'], blankSelectMode.ids)
	}

	case SELECT_MODE_DISABLE:
	case SPACE_LOAD_REQ:
	case SPACE_RELOAD_REQ:{
		if (!action.ignore)
			return state
				.set('selectMode', blankSelectMode)
	}break

	case SELECT_MODE_SELECT_BOOKMARK:{
		if (state.selectMode.enabled && state.selectMode.all)
			return state

		return state
			.set('selectMode', blankSelectMode)
			.setIn(['selectMode', 'enabled'], true)
			.setIn(['selectMode', 'spaceId'], action.spaceId)
			.setIn(['selectMode', 'ids'], _.uniq([action._id].concat(getIds(state, action.spaceId))))
	}

	case SELECT_MODE_UNSELECT_BOOKMARK:{
		const ids = _.filter(getIds(state, action.spaceId), (id)=>id!=action._id)
		if (!ids.length)
			return state
				.set('selectMode', blankSelectMode)

		return state
			.set('selectMode', blankSelectMode)
			.setIn(['selectMode', 'enabled'], true)
			.setIn(['selectMode', 'spaceId'], action.spaceId)
			.setIn(['selectMode', 'ids'], ids)
	}

	case SELECT_MODE_SELECT_ALL:{
		return state
			.set('selectMode', blankSelectMode)
			.setIn(['selectMode', 'enabled'], true)
			.setIn(['selectMode', 'spaceId'], action.spaceId)
			.setIn(['selectMode', 'ids'], [])
			.setIn(['selectMode', 'all'], true)
	}

	case SELECT_MODE_UNSELECT_ALL:{
		return state
			.set('selectMode', blankSelectMode)
			.setIn(['selectMode', 'enabled'], true)
			.setIn(['selectMode', 'spaceId'], action.spaceId)
			.setIn(['selectMode', 'all'], false)
	}

	case BOOKMARK_REMOVE_SUCCESS:{
		return state
			.setIn(
				['selectMode', 'ids'], 
				_.without(state.selectMode.ids, [action._id])
			)
	}
}}

const getIds = (state, spaceId)=>{
	if (state.selectMode.spaceId!=spaceId)
		return blankSelectMode.ids
	return state.selectMode.ids
}