import _ from 'lodash-es'
import { REHYDRATE } from 'redux-persist/src/constants'
import { COLLECTIONS_DEFAULTS_CHANGE } from '../../constants/collections'

export default function(state, action) {switch (action.type) {
	case REHYDRATE:{
		const { defaults } = action.payload && action.payload.collections||{}

		if (typeof defaults == 'object')
			if (Object.keys(defaults).length>0)
				state = state.set('defaults', defaults)

		return state
	}
	
	//Update
	case COLLECTIONS_DEFAULTS_CHANGE:{
		_.forEach(action.items, (item)=>{
			const index = _.findIndex(state.defaults, ({_id})=>_id==item._id)
			if (index!=-1)
				state = state.setIn(['defaults', index], state.defaults[index].merge(item))
		})

		if (action.groupTitle)
			state = state.set('defaultGroupTitle', action.groupTitle)

		return state
	}
}}