import _ from 'lodash-es'
import Immutable from 'seamless-immutable'
import {
	normalizeCollection,
	shouldLoadItems
} from '../../helpers/collections'
import {
	COLLECTION_UPDATE_REQ, COLLECTION_UPDATE_SUCCESS, COLLECTION_UPDATE_ERROR,
	COLLECTION_REMOVE_REQ, COLLECTION_REMOVE_SUCCESS, COLLECTION_REMOVE_ERROR,
	COLLECTION_DRAFT_LOAD_REQ, COLLECTION_DRAFT_LOAD_SUCCESS, COLLECTION_DRAFT_LOAD_ERROR, COLLECTION_DRAFT_CHANGE
} from '../../constants/collections'

export default function(state, action) {switch (action.type) {
	//Change draft
	case COLLECTION_DRAFT_CHANGE:{
		if (Object.keys(action.changed||{}).length){
			var changedFields = state.getIn(['drafts', action._id, 'changedFields'])||[]

			_.forEach(action.changed, (val, key)=>{
				if (state.getIn(['drafts', action._id, 'item', key]) != val) {
					state = state.setIn(['drafts', action._id, 'item', key], val)
					changedFields = changedFields.concat(Immutable([key]))
				}
			})

			state = state.setIn(['drafts', action._id, 'changedFields'], Immutable(_.uniq(changedFields)))
		}

		return state
	}

	//Load
	case COLLECTION_DRAFT_LOAD_REQ:{
		if (!shouldLoadItems(state))
			action.dontLoadCollections = true

		if (action._id<=0 || !Number.isInteger(action._id)) {
			action.ignore = true;
			return state
		}

		let item = state.getIn(['items', action._id]) || undefined
		let status = item ? 'loaded' : 'loading'

		return state
			.setIn(['drafts', action._id, 'status'], status)
			.setIn(['drafts', action._id, 'item'], item)
			.setIn(['drafts', action._id, 'changedFields'], [])
	}

	case COLLECTION_DRAFT_LOAD_SUCCESS:{
		const item = normalizeCollection(action.item)

		return state
			.setIn(['drafts', action._id, 'status'], 'loaded')
			.setIn(['drafts', action._id, 'item'], item)
			.setIn(['drafts', action._id, 'changedFields'], [])
	}

	case COLLECTION_DRAFT_LOAD_ERROR:{
		return state
			.setIn(['drafts', action._id, 'status'], 'errorLoading')
			.setIn(['drafts', action._id, 'item'], undefined)
			.setIn(['drafts', action._id, 'changedFields'], [])
	}

	//Saving/Removing
	case COLLECTION_UPDATE_REQ:
	case COLLECTION_REMOVE_REQ:{
		return state
			.setIn(['drafts', action._id, 'status'], 'saving')
			.setIn(['drafts', action._id, 'changedFields'], [])
	}

	//Error Saving/Removing
	case COLLECTION_UPDATE_ERROR:
	case COLLECTION_REMOVE_ERROR:{
		return state
			.setIn(['drafts', action._id, 'status'], 'errorSaving')
	}

	//Update drafts also
	case COLLECTION_UPDATE_SUCCESS:{
		if (state.getIn(['drafts', action._id, 'item'])){
			const updatedItem = normalizeCollection(action.item)
			const draftItem = state.getIn(['drafts', action._id, 'item'])

			_.forEach(updatedItem, (val,field)=>{
				if (val != draftItem[field])
					state = state.setIn(['drafts', action._id, 'item', field], updatedItem[field])
			})

			state = state.setIn(['drafts', action._id, 'status'], 'loaded')
		}

		return state
	}

	//Remove draft
	case COLLECTION_REMOVE_SUCCESS:{
		let collections = Array.isArray(action._id) ? action._id : [action._id]

		for(const _id of collections)
			if (state.drafts[_id]){
				state = state
						.setIn(['drafts', _id, 'status'], 'removed')
						.setIn(['drafts', _id, 'item'], undefined)
						.setIn(['drafts', _id, 'changedFields'], [])
			}

		return state
	}
}}