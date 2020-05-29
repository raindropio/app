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

			state = state.set('items', state.items.map((item)=>{
				if (item.name==action.tagName)
					return item.set('name', action.newName)
				return item
			}))

			return state
		}

		//Remove
		case TAG_REMOVE_SUCCESS:{
			if (typeof action.onSuccess == 'function')
				action.onSuccess()

			state = state.set('items', state.items.filter((item)=>item.name!=action.tagName))

			return state
		}
	}
}