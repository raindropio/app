import {
	normalizeObjects, normalizeArray, blankItems
} from '../../helpers/tags'

import {
	TAGS_LOAD_SUCCESS, TAGS_LOAD_ERROR,
	TAGS_SUGGESTED_LOAD_SUCCESS
} from '../../constants/tags'

export default function(state, action={}){switch (action.type) {
	case TAGS_LOAD_SUCCESS:{
		return state
			.set('status', 'loaded')
			.set('items', normalizeObjects(action.items))
	}

	case TAGS_LOAD_ERROR:{
		return state
			.set('status', 'error')
			.set('items', blankItems)
	}

	case TAGS_SUGGESTED_LOAD_SUCCESS:{
		return state
			.setIn(['suggested', action._id], normalizeArray(action.items.slice(0,10)))
	}
}}