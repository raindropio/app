import { createSelector } from 'reselect'
import {
	getBookmarkScreenshotIndex,
	blankBookmark,
	blankMeta
} from '../../helpers/bookmarks'

//Single
export const bookmark = ({bookmarks}, _id)=>bookmarks.elements[_id] ? bookmarks.elements[_id] : blankBookmark

export const makeBookmark = ()=>bookmark

export const makeHaveScreenshot = ()=>createSelector(
	[({bookmarks})=>bookmarks, (state, _id)=>_id],
	(bookmarks, _id)=>getBookmarkScreenshotIndex(bookmarks,_id)!=-1
)

export const highlight = ({bookmarks}, _id)=>(bookmarks.meta[_id] ? bookmarks.meta[_id] : blankMeta).highlight

export const makeHighlight = ()=>highlight

export const tags = ({bookmarks}, _id)=>(bookmarks.meta[_id] ? bookmarks.meta[_id] : blankMeta).tags