import _ from 'lodash'
import { normalizeTag } from '../../helpers/tags'
import { REHYDRATE } from 'redux-persist/src/constants'
import { BOOKMARK_DRAFT_LOAD_SUCCESS, BOOKMARK_DRAFT_CHANGE, BOOKMARK_DRAFT_COMMIT } from '../../constants/bookmarks'

const before = {}
const after = {}

export default function(state, action={}){switch (action.type) {
	case REHYDRATE:{
        const { recent=[] } = action.payload && action.payload.tags||{}
        
		return state.set('recent', recent)
    }

    case BOOKMARK_DRAFT_LOAD_SUCCESS:{
        const { item } = action

        before[item._id] = item.tags
        after[item._id] = {}
    }break
    
    case BOOKMARK_DRAFT_CHANGE:{
        const { changed={}, _id } = action
        const { tags=[] } = changed

        after[_id] = tags
    }break

    case BOOKMARK_DRAFT_COMMIT:{
        const { _id } = action

        if (!after[_id] || !before[_id] || !after[_id].length)
            return state

        return state.set(
            'recent', 
            _.uniqBy(
                [
                    ..._.difference(after[_id], before[_id])
                        .reverse()
                        .map(_id=>normalizeTag({ _id })),
                    ...state.recent
                ],
                ({ _id })=>_id.toLowerCase()
            ).slice(0, 5)
        )
    }
}}