import _ from 'lodash-es'
import {
	normalizeBookmark,
	normalizeMeta
} from '../../helpers/bookmarks'
import {
	insertIdToSpace,
	removeIdFromSpace,
	removeIdFromAllSpaces
} from './utils'
import {
	BOOKMARK_CREATE_SUCCESS, BOOKMARK_CREATE_ERROR,
	BOOKMARK_UPDATE_SUCCESS, BOOKMARK_UPDATE_ERROR,
	BOOKMARK_REMOVE_SUCCESS, BOOKMARK_REMOVE_ERROR,
	BOOKMARK_UPLOAD_PROGRESS,
} from '../../constants/bookmarks'

import {
	TAG_RENAME_SUCCESS, TAG_REMOVE_SUCCESS
} from '../../constants/tags'

export default function(state, action) {
	switch (action.type) {
		//Error
		case BOOKMARK_CREATE_ERROR:
		case BOOKMARK_UPDATE_ERROR:
		case BOOKMARK_REMOVE_ERROR:{
			if (typeof action.onFail == 'function')
				action.onFail()

			return state
		}

		//Insert
		case BOOKMARK_CREATE_SUCCESS:{
			const 
				updatedItem = normalizeBookmark(action.item),
				updatedMeta = normalizeMeta(action.item)

			if (typeof action.onSuccess == 'function')
				action.onSuccess(updatedItem)

			//propogate collection id for next listeners
			action.spaceId = String(updatedItem.collectionId)

			//Insert to elements and meta
			state = state
				.setIn(['elements', updatedItem._id], updatedItem)
				.setIn(['meta', updatedItem._id], updatedMeta)

			//Insert ID to spaces
			state = insertIdToSpace(state, action.spaceId, updatedItem._id)
			state = insertIdToSpace(state, '0', updatedItem._id)

			return state
		}

		case BOOKMARK_UPDATE_SUCCESS:{
			if (typeof action.onSuccess == 'function')
				action.onSuccess()

			const updatedItem = normalizeBookmark(action.item)
			const originalItem = state.elements[updatedItem._id]

			//propogate collection id for next listeners
			action.spaceId = String(updatedItem.collectionId)

			//Maybe bookmark moved to another collection
			if (originalItem.collectionId != updatedItem.collectionId){
				//Remove from original collection
				action.movedFromSpaceId = String(originalItem.collectionId)
				state = removeIdFromSpace(state, action.movedFromSpaceId, originalItem._id)
			}

			//Update in spaces
			state = state.setIn(['elements', updatedItem._id], updatedItem)
			state = state.setIn(['meta', updatedItem._id], normalizeMeta(action.item))

			return state
		}

		//Remove
		case BOOKMARK_REMOVE_SUCCESS:{
			if (typeof action.onSuccess == 'function')
				action.onSuccess()

			const item = state.elements[parseInt(action._id)]
			if (item){
				action.spaceId = String(item.collectionId)
				state = removeIdFromAllSpaces(state, item._id)

				//move to trash
				if (action.spaceId != '-99')
					state = insertIdToSpace(state, '-99', item._id)
			}

			return state
		}

		//Upload Progress
		case BOOKMARK_UPLOAD_PROGRESS:{
			//const itemId = parseInt(action._id)

			return state
		}

		//Update tags
		case TAG_RENAME_SUCCESS:{
			var remakeElements = []

			//check meta
			_.forEach(state.meta, (m, metaId)=>{
				const path=['meta', metaId, 'tags']

				state = state.setIn(path, state.getIn(path).map((tagName)=>{
					//replace with new name
					if (tagName==action.tagName){
						remakeElements.push(metaId)
						return action.newName
					}
					return tagName
				}))
			})

			//update static tags value in elements
			_.forEach(remakeElements, (_id)=>{
				state = state.setIn(['elements', _id, 'tags'], state.getIn(['meta', _id, 'tags']).join(', '))
			})

			return state
		}

		//Remove tags
		case TAG_REMOVE_SUCCESS:{
			remakeElements = []

			//check meta
			_.forEach(state.meta, (m, metaId)=>{
				const path=['meta', metaId, 'tags']
				if (state.getIn(path).some((tagName)=>tagName==action.tagName))
					remakeElements.push(metaId)

				state = state.setIn(path, state.getIn(path).filter((tagName)=>tagName!=action.tagName))
			})

			//update static tags value in elements
			_.forEach(remakeElements, (_id)=>{
				state = state.setIn(['elements', _id, 'tags'], state.getIn(['meta', _id, 'tags']).join(', '))
			})

			return state
		}
	}
}