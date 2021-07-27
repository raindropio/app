import _ from 'lodash-es'
import { normalizeTag } from '../../helpers/tags'
import { REHYDRATE } from 'redux-persist/src/constants'
import { TAGS_RECENT_LOAD_SUCCESS } from '../../constants/tags'

export default function(state, action={}){switch (action.type) {
	case REHYDRATE:{
        const { recent=[] } = action.payload && action.payload.tags||{}
        
		return state.set('recent', recent)
    }

    case TAGS_RECENT_LOAD_SUCCESS:{
        const recent = action.tags.map(normalizeTag)

        if (_.isEqual(state.recent, recent))
            return state

        return state.set('recent', recent)
    }
}}