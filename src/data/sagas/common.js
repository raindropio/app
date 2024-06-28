import { put, takeEvery } from 'redux-saga/effects'
import ApiError from '../modules/error'

import { USER_NOT_AUTHORIZED, USER_LOAD_SUCCESS, USER_UPDATE_SUCCESS } from '../constants/user'

//Requests
export default function* () {
	yield takeEvery(action => action.error, checkAuth)
	yield takeEvery([USER_LOAD_SUCCESS, USER_UPDATE_SUCCESS], thirdPartyUserUpdate)
}

//Auth / error check
function* checkAuth(action={}) {
	const { error } = action

	if (typeof error != 'object' ||
		error instanceof ApiError == false){
		throw error
	}

	if (typeof error == 'object' &&
		error instanceof ApiError &&
		error.status==401){
		yield put({type: 'RESET'})
		yield put({type: USER_NOT_AUTHORIZED})
	}
}

//Send additional info to 3rd-party scripts
function thirdPartyUserUpdate({ user: { _id, email } }) {
	if (RAINDROP_ENVIRONMENT != 'browser' || process.env.SENTRY_RELEASE) {
		require('@sentry/minimal').configureScope(scope => {
			scope.setUser({ id: _id, email })
		})
	}
}