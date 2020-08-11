import _ from 'lodash'
import { normalizeCollection, getChildrens } from '../../helpers/collections'
import {
	COLLECTION_TOGGLE, COLLECTION_CHANGE_VIEW,
	COLLECTION_CREATE_SUCCESS, COLLECTION_CREATE_ERROR,
	COLLECTION_UPDATE_SUCCESS, COLLECTION_UPDATE_ERROR,
	COLLECTION_UPDATE_COUNT,
	COLLECTION_REMOVE_SUCCESS, COLLECTION_REMOVE_ERROR
} from '../../constants/collections'
import { actualizeStatus } from './utils'

export default function(state, action) {
	switch (action.type) {
		//Error
		case COLLECTION_CREATE_ERROR:
		case COLLECTION_UPDATE_ERROR:
		case COLLECTION_REMOVE_ERROR:{
			if (typeof action.onFail == 'function')
				action.onFail(action.error)

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

				for(const i in state.defaults)
					if (state.defaults[i]._id == action._id)
						state = state.setIn(['defaults', i, 'view'], action.view)
			}

			let item = state.items[action._id] || normalizeCollection(action)
			item = item.set('view', action.view)
			
			return state.setIn(['items', action._id], item)
		}

		//Create
		case COLLECTION_CREATE_SUCCESS:{
			const newItem = normalizeCollection(action.item).set('isNew', true)

			if (typeof action.onSuccess == 'function')
				action.onSuccess(newItem)

			state = state.setIn(['items', newItem._id], newItem)
			return actualizeStatus(state)
		}

		case COLLECTION_UPDATE_SUCCESS:{
			const updatedItem = normalizeCollection(action.item)
			if (state.items[updatedItem._id])
				state = state.setIn(['items', updatedItem._id], updatedItem)

			if (typeof action.onSuccess == 'function')
				action.onSuccess(updatedItem)

			return actualizeStatus(state)
		}

		case COLLECTION_UPDATE_COUNT:{
			let item = state.items[action._id]

			if (!item)
				return state

			item = item.set('count', parseInt(action.count)||0)
			state = state.setIn(['items', action._id], item)

			return actualizeStatus(state) 
		}

		//Remove
		case COLLECTION_REMOVE_SUCCESS:{
			if (typeof action.onSuccess == 'function')
				action.onSuccess()

			//find all childrens
			action._id = Array.isArray(action._id) ? action._id : [action._id]

			let items = _.values(state.items)
			for(const _id of [...action._id]){
				action._id.push(
					...getChildrens(items, { _id }, 0, true)
						.map(({ _id, item }) => _id || item._id)
				)
			}
			action._id = _.uniq(action._id)
			
			//count and remove all
			let count = 0
			for(const _id of action._id){
				if (!state.items[_id]) continue

				//change trash counter to 0
				if (_id == -99){
					state = state.setIn(['items', -99, 'count'], 0)
					continue
				}
				
				//remove collection (with childrens)
				count += state.items[_id].count
				state = state.set('items', state.items.without(_id))
			}

			//update counters
			state = state
				.setIn(['items', 0, 'count'], (state.items.getIn([0, 'count'])||0) - count)
				.setIn(['items', -99, 'count'], (state.items.getIn([-99, 'count'])||0) + count)

			return actualizeStatus(state)
		}
	}
}