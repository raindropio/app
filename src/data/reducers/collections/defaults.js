import _ from 'lodash-es'

import {
	COLLECTIONS_DEFAULTS_CHANGE
} from '../../constants/collections'

export default function(state, action) {
	switch (action.type) {
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
	}
}