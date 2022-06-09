import { put, takeLatest, call } from 'redux-saga/effects'
import * as c from '../constants/backups'
import Api from '../modules/api'

export default function* () {
	yield takeLatest(c.BACKUPS_LOAD_REQ, load)
}

function* load() {
    try {
		const { items } = yield call(Api.get, 'backups')

		yield put({
			type: c.BACKUPS_LOAD_SUCCESS,
			items
		})
	} catch (error) {
		yield put({
			type: c.BACKUPS_LOAD_ERROR,
			error
		})
	}
}