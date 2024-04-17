import { put, takeLatest, call } from 'redux-saga/effects'
import * as c from '../constants/predictions'
import Api from '../modules/api'

export default function* () {
	yield takeLatest(c.PREDICTIONS_LOAD_REQ, load)
}

function* load() {
    try {
		const { items } = yield call(Api.get, 'predictions?version=1')

		yield put({
			type: c.PREDICTIONS_LOAD_SUCCESS,
			items
		})
	} catch (error) {
		yield put({
			type: c.PREDICTIONS_LOAD_ERROR,
			error
		})
	}
}