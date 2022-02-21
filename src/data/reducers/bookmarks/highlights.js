import { BOOKMARK_HIGHLIGH_ADD, BOOKMARK_HIGHLIGH_UPDATE, BOOKMARK_HIGHLIGH_REMOVE } from '../../constants/bookmarks'
import { normalizeHighlight } from '../../helpers/bookmarks'

export default function(state, action) {switch (action.type) {
    case BOOKMARK_HIGHLIGH_ADD: {
        const { bookmarkId, newOne } = action
        const { highlights=[] } = state.getIn(['meta', bookmarkId]) || {}

        return state.setIn(['meta', bookmarkId, 'highlights'], [
            ...highlights,
            normalizeHighlight(newOne)
        ])
    }

    case BOOKMARK_HIGHLIGH_UPDATE: {
        const { bookmarkId, _id, changed } = action

        const { highlights=[] } = state.getIn(['meta', bookmarkId]) || {}
        const index = highlights.findIndex(h=>_id && h._id == _id)

        if (index == -1) {
            action.ignore = true
            return state
        }

        action.changed = {
            ...highlights[index],
            ...changed,
        }

        return state.setIn(['meta', bookmarkId, 'highlights', index], normalizeHighlight(action.changed))
    }

    case BOOKMARK_HIGHLIGH_REMOVE: {
        const { bookmarkId, _id } = action
        
        const { highlights=[] } = state.getIn(['meta', bookmarkId]) || {}
        const index = highlights.findIndex(h=>_id && h._id == _id)

        if (index == -1) {
            action.ignore = true
            return state
        }

        return state.setIn(['meta', bookmarkId, 'highlights'], highlights.filter(h=>h._id != _id))
    }
}}