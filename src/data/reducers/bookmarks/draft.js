import _ from 'lodash-es'
import { normalizeBookmark, blankDraft } from '../../helpers/bookmarks'
import {
	BOOKMARK_CREATE_REQ, BOOKMARK_CREATE_SUCCESS, BOOKMARK_CREATE_ERROR,
	BOOKMARK_UPDATE_REQ, BOOKMARK_UPDATE_SUCCESS, BOOKMARK_UPDATE_ERROR,
	BOOKMARK_REMOVE_REQ, BOOKMARK_REMOVE_SUCCESS, BOOKMARK_REMOVE_ERROR,
	BOOKMARK_DRAFT_LOAD_REQ, BOOKMARK_DRAFT_LOAD_SUCCESS, BOOKMARK_DRAFT_LOAD_ERROR, BOOKMARK_DRAFT_CHANGE, BOOKMARK_DRAFT_COMMIT
} from '../../constants/bookmarks'

export default function(state, action) {switch (action.type) {
	//Change draft
	case BOOKMARK_DRAFT_CHANGE:{
		const { changed, _id, enrich=false } = action

		//nothing changed
		if (!Object.keys(changed||{}).length)
			return state

		let draft = state.drafts[_id] || blankDraft

		_.forEach(changed, (val, key)=>{
			if (draft.getIn(['item', key]) == val) return

			//enrich: update only empty fields
			if (enrich && !_.isEmpty(draft.getIn(['item', key]))) return

			//fix tags
			if (key=='tags')
				val = _.uniq(
					val.map(tag=>
						tag.trim().replace(/^#|^"#|^"|"$/gm, '')
					)
				)

			//update draft
			draft = draft
				.setIn(['item', key], val)
				.set('changedFields', _.uniq([...(draft.changedFields||[]), key]))
		})

		return state.setIn(['drafts', _id], draft)
	}

	//Load by Id
	case BOOKMARK_DRAFT_LOAD_REQ:{
		const { _id, newOne } = action

		let draft = state.drafts[_id] || blankDraft

		//get data from already loaded bookmarks
		if (state.elements[_id] && state.meta[_id])
			draft = draft
				.set('status', state.elements[_id].collectionId!=-99 ? 'loaded' : 'removed')
				.set('item', {...state.elements[_id], ...state.meta[_id]})
		//not loaded yet
		else{
			draft = draft.set('status', 'loading')

			//is it new?
			if (newOne && newOne.item){
				//clean up new collectionId
				if (!newOne.item.collectionId ||
					newOne.item.collectionId == -99)
					newOne.item.collectionId = -1

				draft = draft.set('item', normalizeBookmark(newOne.item, {flat: false}))
			}
		}

		return state.setIn(['drafts', _id], draft)
	}

	case BOOKMARK_DRAFT_LOAD_SUCCESS:{
		const { _id, item } = action
		let draft = state.drafts[_id] || blankDraft
		
		//item
		const clean = normalizeBookmark(item, {flat: false})

		draft = draft.set(
			'item',
			draft.item.merge(
				draft.changedFields.length ?
					_.omit(clean, draft.changedFields) :
					clean
			)
		)

		//status
		draft = draft.set(
			'status',
			draft.item._id ? (
				draft.item.collectionId!=-99 ? 'loaded' : 'removed'
			) : 'new'
		)

		if (draft.status=='removed')
			action.dontLoadSuggestedTags = true;

		//commit changes
		return state.setIn(['drafts', _id], draft)
	}

	case BOOKMARK_DRAFT_LOAD_ERROR:{
		const { _id, error } = action
		let draft = state.drafts[_id] || blankDraft

		//status
		draft = draft
			.set('status','error')
			.set('error', error)

		return state.setIn(['drafts', _id], draft)
	}

	case BOOKMARK_DRAFT_COMMIT:{
		const { _id } = action
		let draft = state.drafts[_id]

		//ignore when saving/loading/etc or when bookmark is not changed (and not new)
		if (!draft ||
			draft.status == 'idle' ||
			draft.status == 'saving' ||
			draft.status == 'loading' ||
			(draft.item._id && !draft.changedFields.length)){
			action.ignore = true

			if (typeof action.onSuccess == 'function')
				action.onSuccess(draft && draft.item)

			return state
		}

		//attach current item/changedFields to action
		action.item = draft.item
		action.changedFields = draft.changedFields
		
		return state.setIn(['drafts', _id], draft)
	}

	//Create new bookmark from draft
	case BOOKMARK_CREATE_REQ:{
		const { draft } = action
		if (!draft) return state

		return state
			.setIn(['drafts', draft, 'status'], 'saving')
	}

	case BOOKMARK_CREATE_SUCCESS:{
		const { draft, item } = action
		if (!draft) return state

		const newItem = normalizeBookmark(item, {flat: false})

		return state
			.setIn(
				['drafts', draft],
				blankDraft
					.set('status', 'loaded')
					.set('item', newItem)
					.set('changedFields', [])
			)
	}

	case BOOKMARK_CREATE_ERROR:{
		const { draft, error } = action

		return state
			.setIn(['drafts', draft, 'status'], 'error')
			.setIn(['drafts', draft, 'error'], error)
	}

	//Updating/Removing
	case BOOKMARK_UPDATE_REQ:
	case BOOKMARK_REMOVE_REQ:{
		const { _id } = action
		
		for(const key in state.drafts)
			if (state.drafts[key].item && state.drafts[key].item._id == _id)
				return state
					.setIn(['drafts', key, 'status'], 'saving')

		return state		
	}

	//Error Updating/Removing
	case BOOKMARK_UPDATE_ERROR:
	case BOOKMARK_REMOVE_ERROR:{
		const { _id } = action
	
		for(const key in state.drafts)
			if (state.drafts[key].item && state.drafts[key].item._id == _id)
				return state
					.setIn(['drafts', key, 'status'], 'errorSaving')

		return state
	}

	//Update/remove drafts also
	case BOOKMARK_UPDATE_SUCCESS:{
		(Array.isArray(action.item) ? action.item : [action.item]).forEach(item=>{
			for(const key in state.drafts){
				let draft = state.drafts[key]

				//draft not found
				if (!draft || !draft.item ||
					draft.item._id != item._id) continue

				//override only fields that have been saved
				draft = draft
					.set('item', draft.item.merge(
						_.omit(normalizeBookmark(item, {flat: false}), draft.changedFields)
					))
					.set('changedFields', [])

				draft = draft.set('status', parseInt(draft.item.collectionId)!=-99 ? 'loaded' : 'removed')

				state = state.setIn(['drafts', key], draft)
			}
		})

		return state
	}

	case BOOKMARK_REMOVE_SUCCESS:{
		(Array.isArray(action._id) ? action._id : [action._id]).forEach(_id=>{
			for(const key in state.drafts){
				let draft = state.drafts[key]

				//draft not found
				if (!draft || !draft.item ||
					draft.item._id != _id) continue

				draft = draft
					.set('status', 'removed')
					.set('changedFields', [])

				state = state.setIn(['drafts', key], draft)
			}
		})

		return state
	}
}}