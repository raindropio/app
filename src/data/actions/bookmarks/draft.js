import wrapFunc from '../../utils/wrapFunc'
import {
	BOOKMARK_DRAFT_LOAD_REQ, BOOKMARK_DRAFT_CHANGE, BOOKMARK_DRAFT_COMMIT,
	BOOKMARK_DRAFT_ENSURE_REQ
} from '../../constants/bookmarks'

//Drafts
export const draftLoad = (_id)=>({
	type: BOOKMARK_DRAFT_LOAD_REQ,
	_id: parseInt(_id)
})

export const draftEnsure = (link, obj, config={})=>({
	type: BOOKMARK_DRAFT_ENSURE_REQ,
	link: link||'empty',
	obj,
	config
})

export const draftChange = (_id, changed)=>({
	type: BOOKMARK_DRAFT_CHANGE,
	_id: parseInt(_id),
	changed
})

export const draftCommit = (_id, onSuccess, onFail)=>({
	type: BOOKMARK_DRAFT_COMMIT,
	_id: parseInt(_id),
	onSuccess: wrapFunc(onSuccess),
	onFail: wrapFunc(onFail)
})