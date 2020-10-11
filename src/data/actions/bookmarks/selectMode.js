import wrapFunc from '../../utils/wrapFunc'
import {
	SELECT_MODE_ENABLE, SELECT_MODE_DISABLE,
	SELECT_MODE_SELECT_BOOKMARK, SELECT_MODE_UNSELECT_BOOKMARK, 
	SELECT_MODE_SELECT_ALL, SELECT_MODE_UNSELECT_ALL,
	SELECT_MODE_IMPORTANT_SELECTED, SELECT_MODE_REMOVE_SELECTED, SELECT_MODE_SCREENSHOT_SELECTED, SELECT_MODE_APPENDTAGS_SELECTED, SELECT_MODE_REMOVETAGS_SELECTED, SELECT_MODE_MOVE_SELECTED, SELECT_MODE_REPARSE_SELECTED
} from '../../constants/bookmarks'

//Select Mode
export const startSelectMode = (spaceId)=>({
	type: SELECT_MODE_ENABLE,
	spaceId: String(spaceId)
})

export const cancelSelectMode = (spaceId)=>({
	type: SELECT_MODE_DISABLE,
	spaceId: String(spaceId)
})

export const selectOne = (spaceId, _id, shift=false)=>({
	type: SELECT_MODE_SELECT_BOOKMARK,
	_id: parseInt(_id),
	spaceId: String(spaceId),
	shift
})

export const unselectOne = (spaceId, _id)=>({
	type: SELECT_MODE_UNSELECT_BOOKMARK,
	_id: parseInt(_id),
	spaceId: String(spaceId)
})

export const selectAll = (spaceId)=>({
	type: SELECT_MODE_SELECT_ALL,
	spaceId: String(spaceId)
})

export const unselectAll = (spaceId)=>({
	type: SELECT_MODE_UNSELECT_ALL,
	spaceId: String(spaceId)
})


//Select mode actions
export const importantSelected = (spaceId, important=true, onSuccess, onFail)=>({
	type: SELECT_MODE_IMPORTANT_SELECTED,
	spaceId: String(spaceId),
	important,
	onSuccess: wrapFunc(onSuccess),
	onFail: wrapFunc(onFail)
})

export const screenshotSelected = (spaceId, onSuccess, onFail)=>({
	type: SELECT_MODE_SCREENSHOT_SELECTED,
	spaceId: String(spaceId),
	onSuccess: wrapFunc(onSuccess),
	onFail: wrapFunc(onFail)
})

export const appendTagsSelected = (spaceId, tags, onSuccess, onFail)=>({
	type: SELECT_MODE_APPENDTAGS_SELECTED,
	spaceId: String(spaceId),
	tags,
	onSuccess: wrapFunc(onSuccess),
	onFail: wrapFunc(onFail)
})

export const removeTagsSelected = (spaceId, onSuccess, onFail)=>({
	type: SELECT_MODE_REMOVETAGS_SELECTED,
	spaceId: String(spaceId),
	onSuccess: wrapFunc(onSuccess),
	onFail: wrapFunc(onFail)
})

export const removeSelected = (spaceId, onSuccess, onFail)=>({
	type: SELECT_MODE_REMOVE_SELECTED,
	spaceId: String(spaceId),
	onSuccess: wrapFunc(onSuccess),
	onFail: wrapFunc(onFail)
})

export const moveSelected = (spaceId, to, onSuccess, onFail)=>({
	type: SELECT_MODE_MOVE_SELECTED,
	spaceId: String(spaceId),
	to: parseInt(to),
	onSuccess: wrapFunc(onSuccess),
	onFail: wrapFunc(onFail)
})

export const reparseSelected = (spaceId, onSuccess, onFail)=>({
	type: SELECT_MODE_REPARSE_SELECTED,
	spaceId: String(spaceId),
	onSuccess: wrapFunc(onSuccess),
	onFail: wrapFunc(onFail)
})