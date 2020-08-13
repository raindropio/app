import { put, takeLatest, call } from 'redux-saga/effects'
import * as c from '../constants/oauth'
import Api from '../modules/api'

export default function* () {
	yield takeLatest(c.OAUTH_CONNECTIONS_LOAD_REQ, connectionsLoad)
	yield takeLatest(c.OAUTH_CLIENT_REVOKE_REQ, clientRevoke)
}

function* connectionsLoad() {
    try {
		const { items } = yield call(Api.get, 'oauth/connections')

		yield put({
			type: c.OAUTH_CONNECTIONS_LOAD_SUCCESS,
			items
		})
	} catch (error) {
		yield put({
			type: c.OAUTH_CONNECTIONS_LOAD_ERROR,
			error
		})
	}
}

function* clientRevoke({ _id }) {
    try {
		yield call(Api.put, `oauth/client/${_id}/revoke`)

		yield put({
			type: c.OAUTH_CLIENT_REVOKE_SUCCESS,
			_id
		})
	} catch (error) {
		yield put({
			type: c.OAUTH_CLIENT_REVOKE_ERROR,
			error
		})
	}
}