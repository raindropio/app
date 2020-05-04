import { call, put, takeLatest, all } from 'redux-saga/effects'
import Api from '../modules/api'
import ApiError from '../modules/error'
import {
	USER_LOAD_REQ, USER_LOAD_SUCCESS, USER_LOAD_ERROR,
	USER_UPDATE_REQ, USER_UPDATE_SUCCESS, USER_UPDATE_ERROR,
	USER_REFRESH_REQ,
	USER_LOGOUT_REQ,
	USER_NOT_AUTHORIZED,
	USER_LOGIN_PASSWORD,
	USER_REGISTER_PASSWORD,
	USER_LOGIN_NATIVE,
	USER_LOST_PASSWORD, USER_LOST_PASSWORD_SUCCESS,
	USER_RECOVER_PASSWORD,
	USER_SUBSCRIPTION_LOAD_REQ, USER_SUBSCRIPTION_LOAD_SUCCESS, USER_SUBSCRIPTION_LOAD_ERROR
} from '../constants/user'

//Requests
export default function* () {
	yield takeLatest([
		USER_LOAD_REQ,
		USER_REFRESH_REQ
	], loadUser)

	yield takeLatest(USER_UPDATE_REQ, updateUser)

	yield takeLatest(USER_LOGIN_PASSWORD, loginWithPassword)
	yield takeLatest(USER_REGISTER_PASSWORD, registerWithPassword)
	yield takeLatest(USER_LOGIN_NATIVE, loginNative)

	yield takeLatest(USER_LOST_PASSWORD, lostPassword)
	yield takeLatest(USER_RECOVER_PASSWORD, recoverPassword)

	yield takeLatest(USER_LOGOUT_REQ, logout)

	yield takeLatest(USER_SUBSCRIPTION_LOAD_REQ, loadSubscription)
}

function* loadUser({ignore=false, reset=true, way, onSuccess, onFail}) {
	if (ignore)
		return;

	try {
		if (reset)
			yield put({type: 'RESET'})
		
		const {user, result, error, errorMessage} = yield call(Api.get, 'user');

		if (!result)
			throw new ApiError(error, errorMessage||'cant load user')

		yield put({type: USER_LOAD_SUCCESS, user, way, onSuccess})
	} catch (error) {
		yield put({type: USER_LOAD_ERROR, error, way, onFail})
	}
}

function* updateUser(action) {
	try{
		const {user, result, error, errorMessage} = yield call(Api.put, 'user', action.user)
		if (!result)
			throw new ApiError(error, errorMessage || 'cant update user')

		yield put({type: USER_UPDATE_SUCCESS, user})
	} catch (error) {
		yield put({type: USER_UPDATE_ERROR, error})
	}
}

function* loginWithPassword({email, password, onSuccess, onFail}) {
	try {
		const {result, error, errorMessage} = yield call(Api.post, 'auth/login', {email, password});
		if (!result)
			throw new ApiError(error, errorMessage || 'email/password incorrect')

		yield put({type: USER_REFRESH_REQ, way: 'login', onSuccess});
	} catch (error) {
		yield put({type: USER_LOAD_ERROR, error, way: 'login', onFail});
	}
}

function* registerWithPassword({fullName, email, password, onSuccess, onFail}) {
	try {
		const {result, error, errorMessage} = yield call(Api.post, 'user', {fullName, email:email||'0', password});
		if (!result)
			throw new ApiError(error, errorMessage)

		const loginTry = yield call(Api.post, 'auth/login', {email, password});
		if (!loginTry.result)
			throw new ApiError(loginTry.error, loginTry.errorMessage)

		yield put({type: USER_REFRESH_REQ, way: 'register', onSuccess});
	} catch (error) {
		yield put({type: USER_LOAD_ERROR, error, way: 'register', onFail});
	}
}

function* loginNative({params, onSuccess, onFail}) {
	try {
		const {auth, error, errorMessage} = yield call(Api.get, 'auth/'+params.provider+'/native'+params.token);
		if (!auth)
			throw new ApiError(error, errorMessage||'token incorrect')

		yield put({type: USER_REFRESH_REQ, way: 'native', onSuccess});
	} catch (error) {
		yield put({type: USER_LOAD_ERROR, error, way: 'native', onFail});
	}
}

function* lostPassword({email, onSuccess, onFail}) {
	try {
		const { result, error, errorMessage} = yield call(Api.post, 'auth/email/lost', { email })
		if (!result)
			throw new ApiError(error, errorMessage)

		yield put({type: USER_LOST_PASSWORD_SUCCESS, onSuccess})
	} catch (error) {
		yield put({type: USER_LOAD_ERROR, error, way: 'lost', onFail})
	}
}

function* recoverPassword({token, password, onSuccess, onFail}) {
	try {
		const { email, error, errorMessage} = yield call(Api.post, 'auth/email/recover', { token, password })
		if (!email)
			throw new ApiError(error, errorMessage||'token incorrect')

		//login with new password
		yield call(Api.post, 'auth/login', {email, password})

		yield put({type: USER_REFRESH_REQ, way: 'recover', onSuccess})
	} catch (error) {
		yield put({type: USER_LOAD_ERROR, error, way: 'recover', onFail})
	}
}

function* logout({ignore=false}) {
	if (ignore)
		return;

	try {
		yield call(Api.get, 'auth/logout?no_redirect')
		yield put({type: 'RESET'})
		yield put({type: USER_NOT_AUTHORIZED})
	} catch ({message}) {
		console.log(message)
	}
}

function* loadSubscription({ignore=false}) {
	if (ignore)
		return;

	try {
		const {result, ...subscription} = yield call(Api.get, 'user/subscription');

		if (!result)
			throw new ApiError(subscription.error, subscription.errorMessage||'cant load subscription')

		yield put({type: USER_SUBSCRIPTION_LOAD_SUCCESS, subscription})
	} catch (error) {
		yield put({type: USER_SUBSCRIPTION_LOAD_ERROR, error})
	}
}