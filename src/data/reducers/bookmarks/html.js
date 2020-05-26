import { BOOKMARK_HTML_LOAD_REQ, BOOKMARK_HTML_LOAD_SUCCESS, BOOKMARK_HTML_LOAD_ERROR } from '../../constants/bookmarks'
import { blankHtml } from '../../helpers/bookmarks'

export default function(state, action) {switch (action.type) {
    case BOOKMARK_HTML_LOAD_REQ:
        if (!state.html[action._id])
            return state.setIn(['html', action._id], {
                ...blankHtml,
                status: 'loading'
            })
    break

    case BOOKMARK_HTML_LOAD_SUCCESS:
        return state.setIn(['html', action._id], {
            status: 'loaded',
            html: action.html
        })

    case BOOKMARK_HTML_LOAD_ERROR:
        return state.setIn(['html', action._id], {
            ...blankHtml,
            status: 'error'
        })
}}