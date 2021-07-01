import _ from 'lodash-es'
import {
	COLLECTION_REMOVE_SUCCESS,
	GROUP_CREATE, GROUP_TOGGLE, GROUP_REORDER, GROUP_REMOVE, GROUP_RENAME,
	GROUPS_SAVE_SUCCESS, GROUPS_SAVE_ERROR,
	GROUP_APPEND_COLLECTION, GROUP_REMOVE_COLLECTION,
	COLLECTIONS_EXPAND_TO
} from '../../constants/collections'

import {
	normalizeGroups,
	normalizeGroup,
	findParentIds
} from '../../helpers/collections'

import {
	swapArrayElements,
	appendAfterArray
} from '../../helpers/defaults'

import {
	removeCollectionFromGroups
} from './utils'

import ApiError from '../../modules/error'

export default function(state, action) {
	switch (action.type) {
		//Saved
		case GROUPS_SAVE_SUCCESS:{
			if (typeof action.onSuccess == 'function')
				action.onSuccess()

			const clean = normalizeGroups(action.groups)

			if (_.isEqual(state.groups, clean))
				return state

			return state
				.set('groups', clean)
		}

		case GROUPS_SAVE_ERROR:{
			if (typeof action.onFail == 'function')
				action.onFail(action.error)

			return state
		}

		//Create
		case GROUP_CREATE:{
			if (!action.title.trim()){
				action.ignore=true
				return state
			}
			
			return state.set('groups', [...state.groups, normalizeGroup({
				title: action.title
			}, state.groups.length-1)])
		}

		//Rename
		case GROUP_RENAME:{
			const index = _.findIndex(state.groups, (group)=>group._id==action._id)

			if (index==-1){
				action.ignore=true
				return state
			}
			
			return state
				.setIn(['groups', index, 'title'], action.newTitle)
		}

		//Toggle
		case GROUP_TOGGLE:{
			const index = _.findIndex(state.groups, (group)=>group._id==action._id)

			if (index==-1){
				action.ignore=true
				return state
			}
			
			return state
				.setIn(['groups', index, 'hidden'], !state.groups[index].hidden)
		}

		//Reorder group
		case GROUP_REORDER:{
			//indexes
			var fromIndex = _.findIndex(state.groups, ['_id', action._id])
			var toIndex = _.findIndex(state.groups, ['_id', action.before||action.after])

			if (action.after && toIndex<state.groups.length)
				toIndex++

			//Swap
			var groups = state.groups

			for(const i in groups)
				if (i>=toIndex)
					groups = groups.setIn([i, 'sort'], groups[i].sort+1)

			groups = groups.setIn([fromIndex, 'sort'], toIndex)
			
			return state.set('groups', _.sortBy(groups, 'sort'))
		}

		//Remove group
		case GROUP_REMOVE:{
			const group = _.find(state.groups, ({ _id })=>_id==action._id)

			if (!group){
				action.ignore = true

				if (typeof action.onFail == 'function')
					action.onFail(new ApiError({ status: 404, errorMessage: 'group not found' }))
			} else if (group.collections.length){
				action.ignore = true

				if (typeof action.onFail == 'function')
					action.onFail(new ApiError({ errorMessage: 'non-empty group' }))
			}
			else
				return state
					.set('groups', _.filter(state.groups, ({_id, collections=[]}) => (_id!=action._id || collections.length) ))
		}break

		//Append collection to group
		case GROUP_APPEND_COLLECTION:{
			var index = _.findIndex(state.groups, ({_id})=>_id==action._id)

			//no groups, or invalid group id, create new with this id
			if (index==-1){
				state = state.set('groups', [...state.groups, normalizeGroup({
					title: state.defaultGroupTitle,
					_id: action._id
				}, state.groups.length-1)] )

				index = state.groups.length-1;
			}

			state = removeCollectionFromGroups(state, action.collectionId)

			const targetCollections = state.getIn(['groups', index, 'collections'])
			var to = 0

			if (action.after)
				to = targetCollections.indexOf(action.after)+1
			else if (action.before)
				to = targetCollections.indexOf(action.before)
			else if (action.last)
				to = targetCollections.length

			return state
				.setIn(['groups', index, 'hidden'], false)
				.setIn(['groups', index, 'collections'],
						_.uniq(appendAfterArray(targetCollections, action.collectionId, to)))
		}

		case GROUP_REMOVE_COLLECTION:{
			return removeCollectionFromGroups(state, action.collectionId)
		}

		//Apply changes after collections change
		case COLLECTION_REMOVE_SUCCESS:{
			let collections = Array.isArray(action._id) ? action._id : [action._id]

			for(const _id of collections)
				state = removeCollectionFromGroups(state, _id)

			return state
		}

		case COLLECTIONS_EXPAND_TO:{
			const { _id } = action
			const parentId = _.last(findParentIds(state.items, _id)) || _id
			const index = _.findIndex(state.groups, ({collections})=>collections.includes(parentId))

			if (index!=-1)
				return state.setIn(['groups', index, 'hidden'], false)

			return state
		}
	}
}