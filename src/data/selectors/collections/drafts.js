import { createSelector } from 'reselect'
import { normalizeCollection, blankDraft } from '../../helpers/collections'

//Draft
export const makeDraftItem = ()=>createSelector(
	[({collections={}}, _id)=>{
		if (!collections.getIn(['drafts', _id, 'item']))
			return normalizeCollection({_id: _id})

		return collections.drafts[_id].item
	}],
	(item)=>item
)

//Draft Status
export const makeDraftStatus = ()=>createSelector(
	[({collections={}}, _id)=>{
		if (!collections.getIn(['drafts', _id, 'status']))
			return blankDraft.status

		return collections.drafts[_id].status
	}],
	(status)=>status
)