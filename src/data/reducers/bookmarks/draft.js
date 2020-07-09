import _ from 'lodash-es'
import Immutable from 'seamless-immutable'
import {
	normalizeBookmark,
	blankDraft
} from '../../helpers/bookmarks'
import {
	BOOKMARK_CREATE_SUCCESS, BOOKMARK_CREATE_ERROR,
	BOOKMARK_UPDATE_REQ, BOOKMARK_UPDATE_SUCCESS, BOOKMARK_UPDATE_ERROR,
	BOOKMARK_REMOVE_REQ, BOOKMARK_REMOVE_SUCCESS, BOOKMARK_REMOVE_ERROR,
	BOOKMARK_DRAFT_LOAD_REQ, BOOKMARK_DRAFT_LOAD_SUCCESS, BOOKMARK_DRAFT_LOAD_ERROR, BOOKMARK_DRAFT_CHANGE,
	BOOKMARK_DRAFT_ENSURE_REQ, BOOKMARK_DRAFT_SET_STATUS
} from '../../constants/bookmarks'

export default function(state, action) {switch (action.type) {
	//Change draft
	case BOOKMARK_DRAFT_CHANGE:{
		if (!action._id){
			action.ignore = true
			return state
		}
		
		if (Object.keys(action.changed||{}).length){
			var changedFields = state.getIn(['drafts', 'byId', action._id, 'changedFields'])||[]

			_.forEach(action.changed, (val, key)=>{
				if (state.getIn(['drafts', 'byId', action._id, 'item', key]) != val) {
					//fix tags
					if (key=='tags')
						val = _.uniq(
							val.map(tag=>
								tag.trim().replace(/^#|^"#|^"|"$/gm, '')
							)
						)

					state = state.setIn(['drafts', 'byId', action._id, 'item', key], val)
					changedFields = changedFields.concat(Immutable([key]))
				}
			})

			state = state.setIn(['drafts', 'byId', action._id, 'changedFields'], Immutable(_.uniq(changedFields)))
		}

		return state
	}

	//Load
	case BOOKMARK_DRAFT_LOAD_REQ:{
		if (!action._id){
			action.ignore = true
			return state
		}

		if (state.elements[action._id])
			return state.setIn(
				['drafts', 'byId', action._id],
				blankDraft
					.set('status', state.elements[action._id].collectionId!=-99 ? 'loaded' : 'removed')
					.set('item', {...state.elements[action._id], ...state.meta[action._id]})
			)
		else
			return state
				.setIn(
					['drafts', 'byId', action._id, 'status'],
					'loading'
				)
	}

	case BOOKMARK_DRAFT_LOAD_SUCCESS:{
		if (!action._id){
			action.ignore = true
			return state
		}

		const item = normalizeBookmark(action.item, {flat: false})
		const status = (item.collectionId!=-99 ? 'loaded' : 'removed')

		if (status=='removed')
			action.dontLoadSuggestedTags = true;

		return state
			.setIn(
				['drafts', 'byId', action._id],
				blankDraft
					.set('status', status)
					.set('item', item)
			)
	}

	case BOOKMARK_DRAFT_LOAD_ERROR:{
		if (action.link)
			state = state
				.setIn(['drafts', 'linkStatus', action.link], 'error')

		if (!action._id){
			action.ignore = true
			return state
		}

		return state
			.setIn(
				['drafts', 'byId', action._id],
				blankDraft
					.set('status', 'error')
			)
	}

	case BOOKMARK_DRAFT_ENSURE_REQ:{
		return state
			.setIn(['drafts', 'linkStatus', action.link], 'loading')
	}

	case BOOKMARK_DRAFT_SET_STATUS:{
		return state
			.setIn(['drafts', 'linkStatus', action.obj.link], action.status)
	}

	//Can't save bookmark, so maybe it creating of draft?
	case BOOKMARK_CREATE_ERROR:{
		return state
			.setIn(['drafts', 'linkStatus', action.obj.link], 'error')
	}

	//Saving/Removing
	case BOOKMARK_UPDATE_REQ:
	case BOOKMARK_REMOVE_REQ:{
		if (!state.drafts.byId[action._id])
			return state
		
		return state
			.setIn(['drafts', 'byId', action._id, 'status'], 'saving')
			.setIn(['drafts', 'byId', action._id, 'changedFields'], [])
	}

	//Error Saving/Removing
	case BOOKMARK_UPDATE_ERROR:
	case BOOKMARK_REMOVE_ERROR:{
		if (!state.drafts.byId[action._id])
			return state
		
		return state
			.setIn(['drafts', 'byId', action._id, 'status'], 'errorSaving')
	}

	//When bookmark is newly created, make draft open
	case BOOKMARK_CREATE_SUCCESS:{
		const newItem = normalizeBookmark(action.item, {flat: false})

		return state
			.setIn(
				['drafts', 'byId', newItem._id],
				blankDraft
					.set('status', 'loaded')
					.set('item', newItem)
			)
	}

	//Update drafts also
	case BOOKMARK_UPDATE_SUCCESS:{
		(Array.isArray(action.item) ? action.item : [action.item]).forEach(item=>{
			const draft = state.drafts.byId[item._id]
			if (!draft) return

			if (draft.item){
				const updatedItem = normalizeBookmark(item, {flat: false})
				
				_.forEach(updatedItem, (val,field)=>{
					if (val != draft.item[field])
						state = state.setIn(['drafts', 'byId', item._id, 'item', field], updatedItem[field])
				})
			}

			if (item.collectionId || item.collection)
				state = state.setIn(['drafts', 'byId', item._id, 'status'], parseInt(item.collectionId||item.collection.$id)!=-99 ? 'loaded' : 'removed')
		})

		return state
	}

	//Remove draft
	case BOOKMARK_REMOVE_SUCCESS:{
		(Array.isArray(action._id) ? action._id : [action._id]).forEach(_id=>{
			if (state.drafts.byId[_id])
				state = state.setIn(['drafts', 'byId', _id, 'status'], 'removed')
		})

		return state
	}
}}