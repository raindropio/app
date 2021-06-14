import wrapFunc from '../../utils/wrapFunc'
import {
	BOOKMARK_LOAD_REQ, BOOKMARK_CREATE_REQ, BOOKMARKS_CREATE_REQ, BOOKMARK_UPDATE_REQ, BOOKMARK_REMOVE_REQ, BOOKMARK_UPLOAD_REQ,
	BOOKMARK_RECOVER, BOOKMARK_IMPORTANT, BOOKMARK_SCREENSHOT, BOOKMARK_REPARSE, BOOKMARK_MOVE,
	BOOKMARK_REORDER
} from '../../constants/bookmarks'

//High level API
export const oneLoad = (_id)=>({
	type: BOOKMARK_LOAD_REQ,
	_id: parseInt(_id)
})

export const oneRemove = (_id, onSuccess, onFail)=>({
	type: BOOKMARK_REMOVE_REQ,
	_id: parseInt(_id),
	onSuccess: wrapFunc(onSuccess),
	onFail: wrapFunc(onFail)
})

export const oneRecover = (_id, onSuccess, onFail)=>({
	type: BOOKMARK_RECOVER,
	_id: parseInt(_id),
	onSuccess: wrapFunc(onSuccess),
	onFail: wrapFunc(onFail)
})

export const oneImportant = (_id, onSuccess, onFail)=>({
	type: BOOKMARK_IMPORTANT,
	_id: parseInt(_id),
	onSuccess: wrapFunc(onSuccess),
	onFail: wrapFunc(onFail)
})

export const oneScreenshot = (_id, onSuccess, onFail)=>({
	type: BOOKMARK_SCREENSHOT,
	_id: parseInt(_id),
	onSuccess: wrapFunc(onSuccess),
	onFail: wrapFunc(onFail)
})

export const oneReparse = (_id, onSuccess, onFail)=>({
	type: BOOKMARK_REPARSE,
	_id: parseInt(_id),
	onSuccess: wrapFunc(onSuccess),
	onFail: wrapFunc(onFail)
})

export const oneMove = (_id, collectionId, onSuccess, onFail)=>({
	type: BOOKMARK_MOVE,
	_id: parseInt(_id),
	collectionId: parseInt(collectionId),
	onSuccess: wrapFunc(onSuccess),
	onFail: wrapFunc(onFail)
})

export const oneReorder = (_id, toId)=>({
	type: BOOKMARK_REORDER,
	_id: parseInt(_id),
	toId: parseInt(toId)
})

//Low-level API
export const oneCreate = (obj={}, onSuccess, onFail)=>({
	type: BOOKMARK_CREATE_REQ,
	obj,
	onSuccess: wrapFunc(onSuccess),
	onFail: wrapFunc(onFail)
})

export const oneUpload = (obj={}, onSuccess, onFail)=>({
	type: BOOKMARK_UPLOAD_REQ,
	obj, //{collectionId, file:{uri, name, type}}
	onSuccess: wrapFunc(onSuccess),
	onFail: wrapFunc(onFail)
})

export const oneUpdate = (_id, set={}, onSuccess, onFail)=>({
	type: BOOKMARK_UPDATE_REQ,
	_id: parseInt(_id),
	set,
	onSuccess: wrapFunc(onSuccess),
	onFail: wrapFunc(onFail)
})

//Many
export const manyCreate = (items=[], onSuccess, onFail)=>({
	type: BOOKMARKS_CREATE_REQ,
	items,
	onSuccess: wrapFunc(onSuccess),
	onFail: wrapFunc(onFail)
})