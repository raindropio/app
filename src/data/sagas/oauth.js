import { put, takeLatest, call } from 'redux-saga/effects'
import * as c from '../constants/oauth'
import Api from '../modules/api'

export default function* () {
	yield takeLatest(c.OAUTH_CONNECTIONS_LOAD_REQ, connectionsLoad)
	yield takeLatest(c.OAUTH_MY_LOAD_REQ, myLoad)

	yield takeLatest(c.OAUTH_CLIENT_CREATE_REQ, clientCreate)
	yield takeLatest(c.OAUTH_CLIENT_REVOKE_REQ, clientRevoke)
	yield takeLatest(c.OAUTH_CLIENT_REMOVE_REQ, clientRemove)
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

function* myLoad() {
    try {
		const { items } = yield call(Api.get, 'oauth/clients')

		yield put({
			type: c.OAUTH_MY_LOAD_SUCCESS,
			items
		})
	} catch (error) {
		yield put({
			type: c.OAUTH_MY_LOAD_ERROR,
			error
		})
	}
}

function* clientCreate({ obj, onSuccess, onFail }) {
    try {
		const { item } = yield call(Api.post, 'oauth/client', obj)

		yield put({
			type: c.OAUTH_CLIENT_CREATE_SUCCESS,
			item,
			onSuccess
		})
	} catch (error) {
		yield put({
			type: c.OAUTH_CLIENT_CREATE_ERROR,
			error,
			onFail
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

function* clientRemove({ _id }) {
    try {
		yield call(Api.del, `oauth/client/${_id}`)

		yield put({
			type: c.OAUTH_CLIENT_REMOVE_SUCCESS,
			_id
		})
	} catch (error) {
		yield put({
			type: c.OAUTH_CLIENT_REMOVE_ERROR,
			error
		})
	}
}