import { put, takeLatest, call } from 'redux-saga/effects'
import * as c from '../constants/oauth'
import Api from '../modules/api'

export default function* () {
	yield takeLatest(c.OAUTH_CONNECTIONS_LOAD_REQ, connectionsLoad)
	yield takeLatest(c.OAUTH_MY_LOAD_REQ, myLoad)

	yield takeLatest(c.OAUTH_CLIENT_CREATE_REQ, clientCreate)
	yield takeLatest(c.OAUTH_CLIENT_UPDATE_REQ, clientUpdate)
	yield takeLatest(c.OAUTH_CLIENT_REVOKE_REQ, clientRevoke)
	yield takeLatest(c.OAUTH_CLIENT_REMOVE_REQ, clientRemove)
	yield takeLatest(c.OAUTH_CLIENT_ICON_UPLOAD_REQ, clientIconUpload)
	yield takeLatest(c.OAUTH_CLIENT_RESET_SECRET_REQ, clientResetSecret)

	yield takeLatest(c.OAUTH_CLIENT_TEST_TOKEN_LOAD_REQ, clientTestTokenLoad)
	yield takeLatest(c.OAUTH_CLIENT_TEST_TOKEN_CREATE_REQ, clientTestTokenCreate)
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

function* clientUpdate({ _id, obj, onSuccess, onFail }) {
    try {
		const { item } = yield call(Api.put, `oauth/client/${_id}`, obj)

		yield put({
			type: c.OAUTH_CLIENT_UPDATE_SUCCESS,
			_id,
			item,
			onSuccess
		})
	} catch (error) {
		yield put({
			type: c.OAUTH_CLIENT_UPDATE_ERROR,
			_id,
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
			_id,
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
			_id,
			error
		})
	}
}

function* clientIconUpload({ _id, icon, onSuccess, onFail }) {
    try {
		const { item } = yield call(Api.upload, `oauth/client/${_id}/icon`, { icon }, { timeout: 0 })

		yield put({
			type: c.OAUTH_CLIENT_ICON_UPLOAD_SUCCESS,
			_id,
			item,
			onSuccess
		})
	} catch (error) {
		yield put({
			type: c.OAUTH_CLIENT_ICON_UPLOAD_ERROR,
			_id,
			error,
			onFail
		})
	}
}

function* clientResetSecret({ _id }) {
    try {
		const { item } = yield call(Api.put, `oauth/client/${_id}/reset_secret`)

		yield put({
			type: c.OAUTH_CLIENT_RESET_SECRET_SUCCESS,
			_id,
			item
		})
	} catch (error) {
		yield put({
			type: c.OAUTH_CLIENT_RESET_SECRET_ERROR,
			_id,
			error
		})
	}
}

function* clientTestTokenLoad({ _id }) {
    try {
		const { token } = yield call(Api.get, `oauth/client/${_id}/test_token`)

		yield put({
			type: c.OAUTH_CLIENT_TEST_TOKEN_LOAD_SUCCESS,
			_id,
			token
		})
	} catch (error) {
		yield put({
			type: c.OAUTH_CLIENT_TEST_TOKEN_LOAD_ERROR,
			_id,
			error
		})
	}
}

function* clientTestTokenCreate({ _id }) {
    try {
		const { token } = yield call(Api.post, `oauth/client/${_id}/test_token`)

		yield put({
			type: c.OAUTH_CLIENT_TEST_TOKEN_CREATE_SUCCESS,
			_id,
			token
		})
	} catch (error) {
		yield put({
			type: c.OAUTH_CLIENT_TEST_TOKEN_CREATE_ERROR,
			_id,
			error
		})
	}
}