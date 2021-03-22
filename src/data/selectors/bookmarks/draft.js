import { createSelector } from 'reselect'
import { blankDraft } from '../../helpers/bookmarks'

export const getDraft = ({ bookmarks: { drafts } }, _id)=>
	(drafts[_id] || blankDraft)

//Item
export const getDraftItem = (state, _id)=>
	getDraft(state, _id).item
export const makeDraftItem = ()=>getDraftItem //deprecated

//Status
export const getDraftStatus = (state, _id)=>
	getDraft(state, _id).status
export const makeDraftStatus = ()=>getDraftStatus //deprecated

//Unsaved
export const makeDraftUnsaved = ()=>createSelector(
	[getDraft],
	({ changedFields=[] })=>
		changedFields.length>0
)

//Error
export const getDraftError = (state, _id)=>{
	const { status, error } = getDraft(state, _id)
	return status == 'error' ? error : undefined
}