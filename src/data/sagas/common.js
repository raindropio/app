import * as Sentry from '@sentry/minimal'
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
	const { error, ...etc } = action

	if (error instanceof ApiError == false){
		throw error
	}

	if (error instanceof ApiError &&
		error.code=='not_authorized'){
		yield put({type: 'RESET'})
		yield put({type: USER_NOT_AUTHORIZED})
	}
}

//Send additional info to 3rd-party scripts
function thirdPartyUserUpdate({ user }) {
	Sentry.configureScope(scope => {
		scope.setUser(user)
	})
}