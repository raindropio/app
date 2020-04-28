import { call, put, takeLatest } from 'redux-saga/effects'
import Api from '../modules/api'
import ApiError from '../modules/error'
import {
	COVERS_LOAD_REQ, COVERS_LOAD_SUCCESS, COVERS_LOAD_ERROR
} from '../constants/covers'

//Requests
export default function* () {
	yield takeLatest([
		COVERS_LOAD_REQ
	], load)
}

function* load({ ignore=false, query='' }) {
	if (ignore)
		return;

	try {
		const { items, result=false, error, errorMessage } = yield call(Api.get, `collections/covers/${encodeURIComponent(query.trim())}`)

		if (!result)
			throw new ApiError(error, errorMessage||'cant load icons')

		yield put({
			type: COVERS_LOAD_SUCCESS,
			items
		});
	} catch (error) {
		yield put({
			type: COVERS_LOAD_ERROR,
			error
		});
	}
}