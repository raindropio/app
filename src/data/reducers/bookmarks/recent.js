import _ from 'lodash-es'
import { REHYDRATE } from 'redux-persist/src/constants'
import { RECENT_SEARCH_LOAD_SUCCESS, RECENT_SEARCH_CLEAR_SUCCESS } from '../../constants/bookmarks'
import { normalizeRecentSearch } from '../../helpers/bookmarks'

export default function(state, action={}){switch (action.type) {
	case REHYDRATE:{
        const { recent={} } = action.payload && action.payload.bookmarks||{}
		return state.set('recent', recent)
    }

    case RECENT_SEARCH_LOAD_SUCCESS:
    case RECENT_SEARCH_CLEAR_SUCCESS:{
        const search = (action.items||[]).map(normalizeRecentSearch)

        if (_.isEqual(state.recent.search, search))
            return state

        return state.setIn(['recent', 'search'], search)
    }
}}