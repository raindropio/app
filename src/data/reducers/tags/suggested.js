import _ from 'lodash'
import { normalizeTags } from '../../helpers/tags'
import { REHYDRATE } from 'redux-persist/src/constants'
import { TAGS_SUGGESTED_LOAD_SUCCESS } from '../../constants/tags'

export default function(state, action={}){switch (action.type) {
	case REHYDRATE:{
		const { suggested={} } = action.payload && action.payload.tags||{}

		_.forEach(suggested, (tags, _id)=>{
			if (!tags || !tags.length) return
			state = state.setIn(['suggested', _id], tags)
		})

		return state
	}

	case TAGS_SUGGESTED_LOAD_SUCCESS:{
		return state
			.setIn(['suggested', action._id], normalizeTags(
				_.orderBy(
					_.uniqBy(action.tags, tag=>String(tag).toLowerCase())
						.slice(0,10)
						.map(_id=>({ _id })),
					({ _id }) => _id,
					'asc'
				)
			))
	}
}}