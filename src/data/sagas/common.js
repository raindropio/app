import * as Sentry from '@sentry/minimal'
import { put, takeEvery } from 'redux-saga/effects'
import ApiError from '../modules/error'

import { USER_NOT_AUTHORIZED, USER_LOAD_SUCCESS, USER_UPDATE_SUCCESS, USER_LOAD_ERROR } from '../constants/user'

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
		error.status==401 &&
		action.type != USER_LOAD_ERROR){
		yield put({type: 'RESET'})
		yield put({type: USER_NOT_AUTHORIZED})
	}
}

//Send additional info to 3rd-party scripts
function thirdPartyUserUpdate({ user: { _id, email } }) {
	Sentry.configureScope(scope => {
		scope.setUser({ id: _id, email })
	})
}