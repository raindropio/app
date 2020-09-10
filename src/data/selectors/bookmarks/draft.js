import { createSelector } from 'reselect'
import { blankDraft } from '../../helpers/bookmarks'

export const getDraft = ({ bookmarks: { drafts } }, _id)=>
	(drafts[_id] || blankDraft)

//Item
export const getDraftItem = (state, props)=>
	getDraft(state, props).item
export const makeDraftItem = ()=>getDraftItem //deprecated

//Status
export const getDraftStatus = (state, props)=>
	getDraft(state, props).status
export const makeDraftStatus = ()=>getDraftStatus //deprecated

//Unsaved
export const makeDraftUnsaved = ()=>createSelector(
	[getDraft],
	({ status, changedFields=[] })=>
		status == 'new' || changedFields.length>0
)

//Error
export const getDraftError = (state, props)=>{
	const { status, error } = getDraft(state, props)
	return status == 'error' ? error : undefined
}