import _ from 'lodash-es'
import {
	normalizeCollections,
	shouldLoadItems
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
	COLLECTIONS_REORDER
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
		state.groups.forEach(({collections}, groupIndex)=>{
			var items = collections.map(_id=>state.items[_id])
							.filter(item=>item)

			switch(action.method) {
				case 'title':
					items = _.sortBy(items, ({title})=>title.toLowerCase())
				break;

				case 'count':
					items = _.sortBy(items, ({count})=>count).reverse()
				break;
			}

			state = state.setIn(['groups', groupIndex, 'collections'], items.map(({_id})=>parseInt(_id)))
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
		//Decrease counter in changed collection
		state = decreaseCount(state, action.spaceId)

		//Increase counter in Trash collection
		//And Decrease overall counter
		if (action.spaceId!='-99'){
			state = increaseCount(state, '-99')
			state = decreaseCount(state, '0')
		}

		return actualizeStatus(state);
	}
}}