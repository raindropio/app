import { createSelector } from 'reselect'
import { blankDraft } from '../../helpers/bookmarks'

export const getDraft = ({ bookmarks: { drafts } }, { _id })=>
	(drafts[_id] || blankDraft)

//Item
export const makeDraftItem = ()=>createSelector(
	[getDraft],
	({ item }) => item
)

//Status
export const makeDraftStatus = ()=>createSelector(
	[getDraft],
	({ status }) => status
)

//Unsaved
export const makeDraftUnsaved = ()=>createSelector(
	[getDraft],
	({ changedFields=[] })=>changedFields.length>0
)

//Error
export const makeDraftError = ()=>createSelector(
	[getDraft],
	({ status, error })=>
		status == 'error' ? error : undefined
)