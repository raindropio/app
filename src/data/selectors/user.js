import { createSelector } from 'reselect'
import {
	blankCurrent
} from '../helpers/user'

export const user = createSelector(
	[({user={}})=>{
		if (!user.getIn(['current', '_id']))
			return blankCurrent
		
		return user.current
	}],
	(current)=>current
)

export const userStatus = createSelector(
	[({user={}})=>{
		return user.status
	}],
	(status)=>status
)

export const errorReason = createSelector(
	[({user={}})=>{
		return user.errorReason
	}],
	(errorReason)=>errorReason
)

export const isNotAuthorized = createSelector(
	[({user={}})=>{
		return user.getIn(['status', 'authorized'])
	}],
	(authorized)=>authorized=='no'
)

export const isLogged = createSelector(
	[({user={}})=>{
		return user.status
	}],
	(isLogged)=>isLogged=='loaded'
)

export const isPro = createSelector(
	[({user={}})=>{
		return user.getIn(['current', 'pro'])
	}],
	(isPro)=>isPro?true:false
)

export const subscription = createSelector(
	[({user={}})=>user.subscription],
	(subscription)=>subscription
)