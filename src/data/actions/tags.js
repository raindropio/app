import wrapFunc from '../utils/wrapFunc'
import { 
	TAGS_LOAD_REQ,
	TAG_RENAME_REQ,
	TAG_REMOVE_REQ,
	TAGS_REORDER
} from '../constants/tags'

export const load = ()=>({
	type: TAGS_LOAD_REQ
})

export const oneRemove = (tagName, onSuccess, onFail)=>({
	type: TAG_REMOVE_REQ,
	tagName,
	onSuccess: wrapFunc(onSuccess),
	onFail: wrapFunc(onFail)
})

export const oneRename = (tagName, newName, onSuccess, onFail)=>({
	type: TAG_RENAME_REQ,
	tagName,
	newName,
	onSuccess: wrapFunc(onSuccess),
	onFail: wrapFunc(onFail)
})

export const reorder = (method)=>({
	type: TAGS_REORDER,
	method
})