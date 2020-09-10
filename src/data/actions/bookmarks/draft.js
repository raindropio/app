import wrapFunc from '../../utils/wrapFunc'
import {
	BOOKMARK_DRAFT_LOAD_REQ, BOOKMARK_DRAFT_CHANGE, BOOKMARK_DRAFT_COMMIT,
	BOOKMARK_DRAFT_COVER_UPLOAD
} from '../../constants/bookmarks'

//Drafts
export const draftLoad = (_id, newOne={})=>({
	type: BOOKMARK_DRAFT_LOAD_REQ,
	_id,
	newOne //{ item: {}, autoCreate: true, preventDuplicate: true }
})

export const draftChange = (_id, changed)=>({
	type: BOOKMARK_DRAFT_CHANGE,
	_id,
	changed
})

export const draftCommit = (_id, onSuccess, onFail)=>({
	type: BOOKMARK_DRAFT_COMMIT,
	_id,
	onSuccess: wrapFunc(onSuccess),
	onFail: wrapFunc(onFail)
})

export const draftCoverUpload = (_id, cover, onSuccess, onFail)=>({
	type: BOOKMARK_DRAFT_COVER_UPLOAD,
	_id,
	cover,
	onSuccess: wrapFunc(onSuccess),
	onFail: wrapFunc(onFail)
})