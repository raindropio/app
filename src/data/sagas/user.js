import { call, put, takeLatest, all } from 'redux-saga/effects'
import Api from '../modules/api'
import ApiError from '../modules/error'
import {
	USER_LOAD_REQ, USER_LOAD_SUCCESS, USER_LOAD_ERROR,
	USER_UPDATE_REQ, USER_UPDATE_SUCCESS, USER_UPDATE_ERROR,
	USER_AVATAR_UPLOAD_REQ,
	USER_REFRESH_REQ,
	USER_LOGOUT_REQ,
	USER_NOT_AUTHORIZED,
	USER_LOGIN_PASSWORD,
	USER_REGISTER_PASSWORD,
	USER_LOGIN_NATIVE,
	USER_LOGIN_JWT,
	USER_LOST_PASSWORD, USER_LOST_PASSWORD_SUCCESS,
	USER_RECOVER_PASSWORD,
	USER_SUBSCRIPTION_LOAD_REQ, USER_SUBSCRIPTION_LOAD_SUCCESS, USER_SUBSCRIPTION_LOAD_ERROR,
	USER_EXPORT_TO_EMAIL
} from '../constants/user'

//Requests
export default function* () {
	yield takeLatest([
		USER_LOAD_REQ,
		USER_REFRESH_REQ
	], loadUser)

	yield takeLatest(USER_UPDATE_REQ, updateUser)
	yield takeLatest(USER_AVATAR_UPLOAD_REQ, uploadAvatar)

	yield takeLatest(USER_LOGIN_PASSWORD, loginWithPassword)
	yield takeLatest(USER_REGISTER_PASSWORD, registerWithPassword)
	yield takeLatest(USER_LOGIN_NATIVE, loginNative)
	yield takeLatest(USER_LOGIN_JWT, loginJWT)

	yield takeLatest(USER_LOST_PASSWORD, lostPassword)
	yield takeLatest(USER_RECOVER_PASSWORD, recoverPassword)

	yield takeLatest(USER_LOGOUT_REQ, logout)

	yield takeLatest(USER_EXPORT_TO_EMAIL, exportToEmail)

	yield takeLatest(USER_SUBSCRIPTION_LOAD_REQ, loadSubscription)
}

function* loadUser({ignore=false, reset=true, way, onSuccess, onFail}) {
	if (ignore)
		return;

	try {
		if (reset)
			yield put({type: 'RESET'})
		
		const { user } = yield call(Api.get, 'user');

		yield put({type: USER_LOAD_SUCCESS, user, way, onSuccess})
	} catch (error) {
		yield put({type: USER_LOAD_ERROR, error, way, onFail})
	}
}

function* updateUser({ ignore=false, onSuccess, onFail,  ...action }) {
	if (ignore)
		return

	try{
		const { user } = yield call(Api.put, 'user', action.user)

		yield put({type: USER_UPDATE_SUCCESS, user, onSuccess})
	} catch (error) {
		yield put({type: USER_UPDATE_ERROR, error, onFail})
	}
}

function* uploadAvatar({ avatar, ignore=false, onSuccess, onFail }) {
	if (ignore) return

	try{
		const { user } = yield call(Api.upload, 'user/avatar', { avatar })

		yield put({type: USER_UPDATE_SUCCESS, user, onSuccess})
	} catch (error) {
		yield put({type: USER_UPDATE_ERROR, error, onFail})
	}
}

function* loginWithPassword({email, password, onSuccess, onFail}) {
	try {
		yield call(Api.post, 'auth/email/login', {email, password});

		yield put({type: USER_REFRESH_REQ, way: 'login', onSuccess});
	} catch (error) {
		yield put({type: USER_LOAD_ERROR, error, way: 'login', onFail});
	}
}

function* registerWithPassword({name, email, password, onSuccess, onFail}) {
	try {
		yield call(Api.post, 'auth/email/signup', {name, email:email||'0', password});
		yield call(Api.post, 'auth/email/login', {email, password});

		yield put({type: USER_REFRESH_REQ, way: 'register', onSuccess});
	} catch (error) {
		yield put({type: USER_LOAD_ERROR, error, way: 'register', onFail});
	}
}

function* loginNative({params, onSuccess, onFail}) {
	try {
		const {auth, ...etc} = yield call(Api.get, 'auth/'+params.provider+'/native'+params.token);
		if (!auth)
			throw new ApiError(etc)

		yield put({type: USER_REFRESH_REQ, way: 'native', onSuccess});
	} catch (error) {
		yield put({type: USER_LOAD_ERROR, error, way: 'native', onFail});
	}
}

function* loginJWT({token, onSuccess, onFail}) {
	try {
		const {result, ...etc} = yield call(Api.post, 'auth/jwt', { token });
		if (!result)
			throw new ApiError(etc)

		yield put({type: USER_REFRESH_REQ, way: 'jwt', onSuccess});
	} catch (error) {
		yield put({type: USER_LOAD_ERROR, error, way: 'jwt', onFail});
	}
}

function* lostPassword({email, onSuccess, onFail}) {
	try {
		yield call(Api.post, 'auth/email/lost', { email })

		yield put({type: USER_LOST_PASSWORD_SUCCESS, onSuccess})
	} catch (error) {
		yield put({type: USER_LOAD_ERROR, error, way: 'lost', onFail})
	}
}

function* recoverPassword({token, password, onSuccess, onFail}) {
	try {
		const { email, ...etc } = yield call(Api.post, 'auth/email/recover', { token, password })
		if (!email)
			throw new ApiError(etc)

		//login with new password
		yield call(Api.post, 'auth/email/login', {email, password})

		yield put({type: USER_REFRESH_REQ, way: 'recover', onSuccess})
	} catch (error) {
		yield put({type: USER_LOAD_ERROR, error, way: 'recover', onFail})
	}
}

function* logout({ ignore=false, all=false }) {
	if (ignore)
		return;

	try {
		yield call(Api.get, 'auth/logout?no_redirect&'+(all===true?'all':''))
		yield put({type: 'RESET'})
		yield put({type: USER_NOT_AUTHORIZED})
	} catch ({message}) {
		console.log(message)
	}
}

function* exportToEmail({ ignore=false, onSuccess, onFail }) {
	if (ignore)
		return;

	try {
		yield call(Api.get, 'user/export?json=1')
		onSuccess()
	} catch (error) {
		onFail(error)
	}
}

function* loadSubscription({ignore=false}) {
	if (ignore)
		return;

	try {
		const { ...subscription } = yield call(Api.get, 'user/subscription');

		yield put({type: USER_SUBSCRIPTION_LOAD_SUCCESS, subscription})
	} catch (error) {
		yield put({type: USER_SUBSCRIPTION_LOAD_ERROR, error})
	}
}