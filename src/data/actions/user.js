import wrapFunc from '../utils/wrapFunc'
import { 
	USER_LOAD_REQ, USER_REFRESH_REQ, USER_LOGOUT_REQ, 
	USER_LOGIN_PASSWORD, USER_REGISTER_PASSWORD,
	USER_LOGIN_NATIVE,
	USER_LOST_PASSWORD, USER_RECOVER_PASSWORD,
	USER_SUBSCRIPTION_LOAD_REQ,
	USER_UPDATE_REQ
} from '../constants/user'

export const load = ()=>({
	type: USER_LOAD_REQ
})

export const refresh = ()=>({
	type: USER_REFRESH_REQ,
	reset: false
})

export const save = (user, onSuccess, onFail)=>({
	type: USER_UPDATE_REQ,
	user,
	onSuccess: wrapFunc(onSuccess),
	onFail: wrapFunc(onFail)
})

export const loginWithPassword = ({email, password})=>({
	type: USER_LOGIN_PASSWORD,
	email, password
})

export const registerWithPassword = ({fullName, email, password})=>({
	type: USER_REGISTER_PASSWORD,
	fullName, email, password
})

export const loginNative = (params, onSuccess, onFail)=>({
	type: USER_LOGIN_NATIVE,
	params,
	onSuccess: wrapFunc(onSuccess),
	onFail: wrapFunc(onFail)
})

export const lostPassword = ({ email })=>({
	type: USER_LOST_PASSWORD,
	email
})

export const recoverPassword = ({ token, password })=>({
	type: USER_RECOVER_PASSWORD,
	token, password
})

export const logout = ()=>({
	type: USER_LOGOUT_REQ
})

export const loadSubscription = ()=>({
	type: USER_SUBSCRIPTION_LOAD_REQ
})