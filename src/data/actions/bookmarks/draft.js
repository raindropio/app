import wrapFunc from '../../utils/wrapFunc'
import {
	BOOKMARK_DRAFT_LOAD_REQ, BOOKMARK_DRAFT_CHANGE, BOOKMARK_DRAFT_COMMIT
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