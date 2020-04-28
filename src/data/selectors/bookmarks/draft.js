import { createSelector } from 'reselect'
import _ from 'lodash-es'
import {
	blankDraft,
	normalizeBookmark
} from '../../helpers/bookmarks'

const getDraftByLink = (bookmarks, link)=>{
	const draft = _.find(bookmarks.drafts.byId, ({item={}})=>item.link==(link||'empty'))
	if (draft)
		return draft;

	const linkStatus = bookmarks.getIn(['drafts', 'linkStatus', link||'empty'])
	if (linkStatus)
		return {
			status: linkStatus
		}

	return false;
}

//Draft
export const makeDraftItem = ()=>createSelector(
	[({bookmarks={}}, {_id=0, link})=>{
		const byId = ()=>(_id ? bookmarks.getIn(['drafts', 'byId', _id, 'item']) : false)
		const byLink = ()=>(typeof link != 'undefined' ? getDraftByLink(bookmarks, link).item : false)

		return byId() || byLink() || normalizeBookmark({_id: _id}, {flat: false})
	}],
	(item)=>item
)

//Draft Status
export const makeDraftStatus = ()=>createSelector(
	[({bookmarks={}}, {_id, link})=>{
		const byId = ()=>(_id ? bookmarks.getIn(['drafts', 'byId', _id, 'status']) : false)
		const byLink = ()=>(typeof link != 'undefined' ? getDraftByLink(bookmarks, link).status : false)
		return byId() || byLink() || blankDraft.status
	}],
	(status)=>status
)