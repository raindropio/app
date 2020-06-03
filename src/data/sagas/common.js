import { put, takeEvery } from 'redux-saga/effects'
import ApiError from '../modules/error'

import {
	USER_NOT_AUTHORIZED
} from '../constants/user'

//Requests
const common = function* common () {
	yield takeEvery(action => action.error, checkAuth)
}
export default common

function* checkAuth(action={}) {
	const { error, ...etc } = action

	if (error instanceof ApiError == false){
		console.log('redux:', etc)
		console.trace(error)
	}else
		throw error

	if (error instanceof ApiError &&
		error.code=='not_authorized'){
		yield put({type: 'RESET'})
		yield put({type: USER_NOT_AUTHORIZED})
	}
}