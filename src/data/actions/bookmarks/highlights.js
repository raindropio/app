import { BOOKMARK_HIGHLIGH_ADD, BOOKMARK_HIGHLIGH_UPDATE, BOOKMARK_HIGHLIGH_REMOVE } from '../../constants/bookmarks'

//Drafts
export const highlightAdd = (bookmarkId, newOne={})=>({
	type: BOOKMARK_HIGHLIGH_ADD,
	bookmarkId,
	newOne //{ text, note, ... }
})

export const highlightUpdate = (bookmarkId, _id, changed)=>({
	type: BOOKMARK_HIGHLIGH_UPDATE,
	bookmarkId,
    _id,
	changed //{text, ...}
})

export const highlightRemove = (bookmarkId, _id)=>({
	type: BOOKMARK_HIGHLIGH_REMOVE,
	bookmarkId,
    _id
})