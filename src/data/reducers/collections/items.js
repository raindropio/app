import _ from 'lodash-es'
import {
	normalizeCollections,
	shouldLoadItems,
	findParentIds
} from '../../helpers/collections'
import {
	increaseCount,
	decreaseCount,
	updateCollections,
	actualizeStatus
} from './utils'

import {REHYDRATE} from 'redux-persist/src/constants'

import {
	COLLECTIONS_LOAD_REQ, COLLECTIONS_LOAD_SUCCESS, COLLECTIONS_LOAD_ERROR,
	COLLECTIONS_REFRESH_REQ,
	COLLECTIONS_REORDER,
	COLLECTIONS_EXPAND_TO, COLLECTIONS_COLLAPSE_ALL
} from '../../constants/collections'

import {
	BOOKMARK_CREATE_SUCCESS, BOOKMARK_UPDATE_SUCCESS, BOOKMARK_REMOVE_SUCCESS
} from '../../constants/bookmarks'

export default function(state, action) {switch (action.type) {
	case REHYDRATE:{
		const {items, groups} = action.payload && action.payload.collections||{}

		if (typeof items == 'object')
			if (Object.keys(items).length>0)
				state = state.set('items', items)

		if (Array.isArray(groups))
			if (groups.length>0)
				state = state.set('groups', groups)

		return state
	}

	//Load
	case COLLECTIONS_LOAD_REQ:{
		if (!shouldLoadItems(state)) {
			action.dontLoadCollections = true
			return state;
		}

		return state
			.set('status', 'loading')
	}

	case COLLECTIONS_LOAD_SUCCESS:{
		state = updateCollections(state, normalizeCollections(action.items, action.groups))
		state = state.set('status', 'loaded')

		return actualizeStatus(state)
	}

	case COLLECTIONS_LOAD_ERROR:{
		//state = updateCollections(state, normalizeCollections())

		return state
			.set('status', 'error')
	}

	//Refresh
	case COLLECTIONS_REFRESH_REQ:{
		return state
			.set('status', 'loading')
	}

	//Reorder all collections
	case COLLECTIONS_REORDER:{
		let items
		switch(action.method) {
			case 'title':
				items = _.sortBy(state.items, ({title})=>title.toLowerCase())
			break;

			case 'count':
				items = _.sortBy(state.items, ({count})=>count).reverse()
			break;
		}

		items.forEach((item, i)=>
			state = state.setIn(['items', item._id, 'sort'], i)
		)

		state.groups.forEach(({collections}, groupIndex)=>{
			let ids = items
				.filter(({_id})=>collections.includes(_id))
				.map(({_id})=>parseInt(_id))

			state = state.setIn(
				['groups', groupIndex, 'collections'], 
				ids
			)
		})

		return state
	}

	case COLLECTIONS_EXPAND_TO:{
		const parents = findParentIds(state.items, action._id)

		if (action.self)
			parents.push(action._id)

		if (parents.length)
			parents.forEach(_id=>{
				state = state.setIn(['items', _id, 'expanded'], true)
			})

		return state
	}

	case COLLECTIONS_COLLAPSE_ALL:{
		Object.entries(state.items).forEach(([_id])=>{
			state = state.setIn(['items', _id, 'expanded'], false)
		})

		return state
	}

	//Actions on bookmarks change
	case BOOKMARK_CREATE_SUCCESS:{
		state = increaseCount(state, action.spaceId)
		state = increaseCount(state, '0')
		
		return actualizeStatus(state)
	}

	case BOOKMARK_UPDATE_SUCCESS:{
		//bookmark is moved from one to another
		if (action.movedFromSpaceId){
			state = decreaseCount(state, action.movedFromSpaceId)
			state = increaseCount(state, action.spaceId)

			//recovered from Trash
			if (action.movedFromSpaceId=='-99')
				state = increaseCount(state, '0')
		}
		return actualizeStatus(state)
	}

	case BOOKMARK_REMOVE_SUCCESS:{
		//Decrease counter in changed collection(s)
		(Array.isArray(action.spaceId) ? action.spaceId : [action.spaceId]).forEach(spaceId=>{
			state = decreaseCount(state, spaceId)
		})

		//Increase counter in Trash collection
		//And Decrease overall counter
		if (action.spaceId!='-99'){
			state = increaseCount(state, '-99')
			state = decreaseCount(state, '0')
		}

		return actualizeStatus(state);
	}
}}