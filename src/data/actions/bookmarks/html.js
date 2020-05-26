import { BOOKMARK_HTML_LOAD_REQ } from '../../constants/bookmarks'

export const htmlLoad = _id=>({
    type: BOOKMARK_HTML_LOAD_REQ,
    _id: parseInt(_id)
})