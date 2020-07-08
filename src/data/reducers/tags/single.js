import _ from 'lodash'
import { normalizeTag } from '../../helpers/tags'
import {
	TAG_RENAME_SUCCESS, TAG_RENAME_ERROR,
	TAG_REMOVE_SUCCESS, TAG_REMOVE_ERROR
} from '../../constants/tags'

export default function(state, action) {
	switch (action.type) {
		//Error
		case TAG_RENAME_ERROR:
		case TAG_REMOVE_ERROR:{
			if (typeof action.onFail == 'function')
				action.onFail(action.error)

			return state
		}

		//Update
		case TAG_RENAME_SUCCESS:{
			if (typeof action.onSuccess == 'function')
				action.onSuccess()

			_.forEach(state.spaces, (space, spaceId)=>{
				const path=['spaces', spaceId, 'tags']
	
				state = state.setIn(path, state.getIn(path).map((item)=>{
					if (item._id==action.tagName)
						return normalizeTag(
							item.set('_id', action.newName)
						)
					return item
				}))
			})
	
			return state
		}

		//Remove
		case TAG_REMOVE_SUCCESS:{
			if (typeof action.onSuccess == 'function')
				action.onSuccess()

			_.forEach(state.spaces, (space, spaceId)=>{
				const path=['spaces', spaceId, 'tags']
	
				state = state.setIn(path, state.getIn(path).filter((item)=>item._id!=action.tagName))
			})
	
			return state
		}
	}
}