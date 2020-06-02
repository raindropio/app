import { createSelector } from 'reselect'
import _ from 'lodash-es'
import { blankSharing } from '../../helpers/collections'

//Sharing
export const getSharing = (state, _id) =>
	state.collections.sharing.items[_id] || blankSharing.items

export const getSharingStatus = (state, _id) =>
	state.collections.sharing.status[_id] || blankSharing.status

export const makeSharingByRole = ()=>createSelector(
	[getSharing],
	(sharing)=>{
		return _.groupBy(sharing, 'role')
	}
)

export const makeCollaboratorByUserId = ()=>createSelector(
	[getSharing, (state, cId, userId)=>userId],
	(sharing, userId)=>_.find(sharing, ['_id', userId])
)

export const getSharingCount = (state, _id)=>
	getSharing(state, _id).length

export const getSharingSendInvitesTo = (state, _id) =>
	state.collections.sharing.sendInvitesTo[_id] || blankSharing.sendInvitesTo

export const getSharingSendInvitesStatus = (state, _id) =>
	state.collections.sharing.sendInvitesStatus[_id] || blankSharing.sendInvitesStatus