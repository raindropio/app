import {
	normalizeCollection
} from '../../helpers/collections'
import {
	COLLECTION_TOGGLE, COLLECTION_CHANGE_VIEW,
	COLLECTION_CREATE_SUCCESS, COLLECTION_CREATE_ERROR,
	COLLECTION_UPDATE_SUCCESS, COLLECTION_UPDATE_ERROR,
	COLLECTION_REMOVE_SUCCESS, COLLECTION_REMOVE_ERROR,
	COLLECTION_BLANK_IN_PARENT
} from '../../constants/collections'
import {
	actualizeStatus
} from './utils'

export default function(state, action) {
	switch (action.type) {
		//Error
		case COLLECTION_CREATE_ERROR:
		case COLLECTION_UPDATE_ERROR:
		case COLLECTION_REMOVE_ERROR:{
			if (typeof action.onFail == 'function')
				action.onFail()

			return state
		}

		case COLLECTION_TOGGLE:{
			const collection = state.getIn(['items', action._id])
			action.expanded = !collection.expanded

			return state
				.setIn(['items', action._id, 'expanded'], action.expanded)
		}

		case COLLECTION_CHANGE_VIEW:{
			if (action._id<=0){
				action.ignore = true
				return state
					.setIn(['items', action._id, 'view'], action.view)
			}
			return state
		}

		case COLLECTION_BLANK_IN_PARENT:{
			return state
				.set('blankChildInParent', action.parentId)
				.setIn(['items', action.parentId, 'expanded'], true)
		}

		//Create
		case COLLECTION_CREATE_SUCCESS:{
			const newItem = normalizeCollection(action.item).set('isNew', true)

			if (typeof action.onSuccess == 'function')
				action.onSuccess(newItem)

			state = state.setIn(['items', newItem._id], newItem)
			return actualizeStatus(state)
		}

		//Update
		case COLLECTION_UPDATE_SUCCESS:{
			const updatedItem = normalizeCollection(action.item)
			if (state.items[updatedItem._id])
				state = state.setIn(['items', updatedItem._id], updatedItem)

			if (typeof action.onSuccess == 'function')
				action.onSuccess(updatedItem)

			return actualizeStatus(state)
		}

		//Remove
		case COLLECTION_REMOVE_SUCCESS:{
			if (typeof action.onSuccess == 'function')
				action.onSuccess()

			if (action._id>0)
				state = state.set('items', state.items.without(action._id))

			return actualizeStatus(state)
		}
	}
}