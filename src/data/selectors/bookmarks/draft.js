import { createSelector } from 'reselect'
import { blankDraft } from '../../helpers/bookmarks'

//Draft
export const makeDraftItem = ()=>createSelector(
	[({bookmarks={}}, { _id })=>{
		return (bookmarks.drafts[_id] || blankDraft).item
	}],
	(item)=>item
)

//Draft Status
export const makeDraftStatus = ()=>createSelector(
	[({bookmarks={}}, { _id })=>{
		return (bookmarks.drafts[_id] || blankDraft).status
	}],
	(status)=>status
)

//Unsaved
export const makeDraftUnsaved = ()=>createSelector(
	[({bookmarks={}}, { _id })=>{
		return (bookmarks.drafts[_id] || blankDraft).changedFields
	}],
	(changedFields=[])=>changedFields.length>0
)