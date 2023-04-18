import { createSelector } from 'reselect'
import {
	getBookmarkScreenshotIndex,
	blankSpace,
	blankBookmark,
	blankMeta
} from '../../helpers/bookmarks'

const emptyObject = {}

//Single
export const bookmark = ({bookmarks}, _id)=>bookmarks.elements[_id] ? bookmarks.elements[_id] : blankBookmark

export const makeBookmark = ()=>bookmark

export const makeHaveScreenshot = ()=>createSelector(
	[({bookmarks})=>bookmarks, (state, _id)=>_id],
	(bookmarks, _id)=>getBookmarkScreenshotIndex(bookmarks,_id)!=-1
)

export const highlight = ({bookmarks : { spaces } }, spaceId, _id)=>
	(
		(spaces[spaceId] ? spaces[spaceId] : blankSpace)
			.highlight
	)[_id] || emptyObject

export const makeHighlight = ()=>highlight

export const tags = ({bookmarks}, _id)=>(bookmarks.meta[_id] ? bookmarks.meta[_id] : blankMeta).tags

export const highlights = ({bookmarks}, _id, limit=0)=>{
	const items = (bookmarks.meta[_id] ? bookmarks.meta[_id] : blankMeta).highlights
	if (limit)
		return items.slice(0, limit)
	return items
}

export const makeHighlights = ()=>highlights

export const makeCreatorRef = ()=>createSelector(
	[({bookmarks}, _id)=>bookmarks.meta[_id], ({user})=>user.current._id],
	(meta, currentUserId)=>{
		const { creatorRef } = meta || blankMeta

		if (creatorRef && creatorRef._id == currentUserId)
			return blankMeta.creatorRef
			
		return creatorRef
	}
)

export const makeSuggestedFields = ()=>createSelector(
	[
		({bookmarks}, { link })=>bookmarks.suggestedFields[link] || {},
		({config})=>config.last_collection,
		(_, { collectionId })=>collectionId
	],
	({ collections=[], tags=[] }, last_collection, collectionId)=>({
		collections: [
			...(last_collection == 0 || collectionId == last_collection || collections.includes(last_collection) ? [] : [last_collection]),
			...collections
		].splice(0, 5),
		
		tags
	})
)