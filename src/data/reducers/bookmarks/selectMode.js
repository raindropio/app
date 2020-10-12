import _ from 'lodash-es'

import { blankSelectMode } from '../../helpers/bookmarks'

import {
	SELECT_MODE_ENABLE,
	SELECT_MODE_DISABLE,
	SELECT_MODE_SELECT_BOOKMARK,
	SELECT_MODE_UNSELECT_BOOKMARK,
	SELECT_MODE_SELECT_ALL,
	SELECT_MODE_UNSELECT_ALL,

	SELECT_MODE_IMPORTANT_SELECTED,
	SELECT_MODE_SCREENSHOT_SELECTED,
	SELECT_MODE_REMOVE_SELECTED,
	SELECT_MODE_APPENDTAGS_SELECTED,
	SELECT_MODE_REMOVETAGS_SELECTED,
	SELECT_MODE_MOVE_SELECTED,
	SELECT_MODE_REPARSE_SELECTED,
	SELECT_MODE_FAIL_SELECTED,

	SPACE_LOAD_REQ,

	BOOKMARK_REMOVE_SUCCESS
} from '../../constants/bookmarks'

export default function(state, action) {switch (action.type) {
	case SELECT_MODE_ENABLE:{
		if (state.getIn(['spaces', action.spaceId, 'status', 'main']) != 'loaded')
			return state

		return state
			.set('selectMode', blankSelectMode)
			.setIn(['selectMode', 'enabled'], true)
			.setIn(['selectMode', 'spaceId'], action.spaceId)
	}

	case SELECT_MODE_DISABLE:
	case SPACE_LOAD_REQ:{
		if (!action.ignore)
			return state
				.set('selectMode', blankSelectMode)
	}break

	case SELECT_MODE_SELECT_BOOKMARK:{
		const { spaceId, _id, shift=false } = action

		if (state.selectMode.enabled && state.selectMode.all && state.selectMode.spaceId == spaceId)
			return state

		//get ids
		let selected = [...getEstimatedIds(state, spaceId)]

		if (!shift)
			selected.unshift(_id)
		else {
			const already = state.selectMode.ids
			const all = state.spaces[spaceId].ids
			const fromIndex = already.length ? all.findIndex(id=>id==already[0]) : 0
			const toIndex = all.findIndex(id=>id==_id)

			selected.push(...all.filter((id,index)=>{
				if (fromIndex > toIndex)
					return index <= fromIndex && index >= toIndex
				else if (fromIndex < toIndex)
					return index >= fromIndex && index <= toIndex
				else if (fromIndex == toIndex)
					return index == fromIndex
				else
					return false
			}))
		}

		return state
			.set('selectMode', blankSelectMode)
			.setIn(['selectMode', 'enabled'], true)
			.setIn(['selectMode', 'spaceId'], spaceId)
			.setIn(['selectMode', 'ids'], _.uniq(selected))
	}

	case SELECT_MODE_UNSELECT_BOOKMARK:{
		let ids = _.filter(getEstimatedIds(state, action.spaceId), (id)=>id!=action._id)
		
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

	case SELECT_MODE_IMPORTANT_SELECTED:
		return state.setIn(['selectMode', 'working'], 'important')

	case SELECT_MODE_SCREENSHOT_SELECTED:
		return state.setIn(['selectMode', 'working'], 'screenshot')

	case SELECT_MODE_REMOVE_SELECTED:
		return state.setIn(['selectMode', 'working'], 'remove')

	case SELECT_MODE_APPENDTAGS_SELECTED:
		return state.setIn(['selectMode', 'working'], 'appendTags')

	case SELECT_MODE_REMOVETAGS_SELECTED:
		return state.setIn(['selectMode', 'working'], 'removeTags')

	case SELECT_MODE_MOVE_SELECTED:
		return state.setIn(['selectMode', 'working'], 'move')

	case SELECT_MODE_REPARSE_SELECTED:
		return state.setIn(['selectMode', 'working'], 'reparse')

	case SELECT_MODE_FAIL_SELECTED:
		return state.setIn(['selectMode', 'working'], '')

	case BOOKMARK_REMOVE_SUCCESS:{
		return state
			.setIn(
				['selectMode', 'ids'], 
				_.without(state.selectMode.ids, ...(Array.isArray(action._id) ? action._id : [action._id]))
			)
	}
}}

const getEstimatedIds = (state, spaceId)=>{
	if (state.selectMode.spaceId!=spaceId)
		return blankSelectMode.ids

	if (state.selectMode.enabled && state.selectMode.all)
		return state.spaces[state.selectMode.spaceId].ids

	return state.selectMode.ids
}