import { call, put, takeEvery } from 'redux-saga/effects'
import Api from '../../modules/api'
import {
	SHARING_LOAD_REQ, SHARING_LOAD_SUCCESS, SHARING_LOAD_ERROR,
	SHARING_UPDATE_USER_REQ, SHARING_UPDATE_USER_SUCCESS, SHARING_UPDATE_USER_ERROR,
	SHARING_REMOVE_USER_REQ, SHARING_REMOVE_USER_SUCCESS, SHARING_REMOVE_USER_ERROR,
	SHARING_UNSHARE_REQ, SHARING_UNSHARE_SUCCESS, SHARING_UNSHARE_ERROR,
	SHARING_SEND_INVITES_REQ, SHARING_SEND_INVITES_SUCCESS, SHARING_SEND_INVITES_ERROR,
	SHARING_JOIN, 
	COLLECTION_DRAFT_LOAD_REQ, COLLECTIONS_REFRESH_REQ
} from '../../constants/collections'

//Requests
export default function* () {
	//draft
	yield takeEvery(SHARING_LOAD_REQ, load)
	yield takeEvery(SHARING_SEND_INVITES_REQ, sendInvites)
	yield takeEvery(COLLECTION_DRAFT_LOAD_REQ, draftLoad)
	yield takeEvery(SHARING_UPDATE_USER_REQ, updateUser)
	yield takeEvery(SHARING_REMOVE_USER_REQ, removeUser)
	yield takeEvery(SHARING_UNSHARE_REQ, unshare)
	yield takeEvery(SHARING_JOIN, join)
}

function* load({ collectionId=0, ignore=false }) {
	if ((ignore)||(collectionId<=0))
		return;

	try{
		const { items=[] } = yield call(Api.get, `collection/${collectionId}/sharing`)

		yield put({
			type: SHARING_LOAD_SUCCESS,
			collectionId,
			items
		});
	} catch (error) {
		yield put({
			type: SHARING_LOAD_ERROR,
			collectionId,
			error
		});
	}
}

function* draftLoad({ _id=0 }) {
	yield put({ type: SHARING_LOAD_REQ, collectionId: _id })
}

function* sendInvites({ collectionId=0, ignore=false, emails=[], role }) {
	if ((ignore)||(collectionId<=0))
		return;

	try{
		const res = yield call(Api.post, `collection/${collectionId}/sharing`, {
			emails, role
		})

		yield put({
			type: SHARING_SEND_INVITES_SUCCESS,
			collectionId,
			emails: res.emails
		});
	} catch (error) {
		yield put({
			type: SHARING_SEND_INVITES_ERROR,
			collectionId,
			error
		});
	}
}

function* updateUser({ collectionId=0, ignore=false, userId, set={} }) {
	if (ignore) return

	try{
		yield call(Api.put, `collection/${collectionId}/sharing/${userId}`, set)

		yield put({
			type: SHARING_UPDATE_USER_SUCCESS,
			collectionId, userId, set
		})

		//Reload list
		yield put({
			type: SHARING_LOAD_REQ,
			collectionId
		})
	} catch (error) {
		yield put({
			type: SHARING_UPDATE_USER_ERROR,
			collectionId, userId, set,
			error
		})
	}
}

function* removeUser({ collectionId=0, ignore=false, userId }) {
	if (ignore) return

	try{
		yield call(Api.del, `collection/${collectionId}/sharing/${userId}`)

		yield put({
			type: SHARING_REMOVE_USER_SUCCESS,
			collectionId, userId
		})

		//Reload list
		yield put({
			type: SHARING_LOAD_REQ,
			collectionId
		})
	} catch (error) {
		yield put({
			type: SHARING_REMOVE_USER_ERROR,
			collectionId, userId,
			error
		})
	}
}

function* unshare({ collectionId=0, ignore=false }) {
	if ((ignore)||(collectionId<=0))
		return;

	try{
		yield call(Api.del, `collection/${collectionId}/sharing`)

		yield put({
			type: SHARING_UNSHARE_SUCCESS,
			collectionId
		});
	} catch (error) {
		yield put({
			type: SHARING_UNSHARE_ERROR,
			collectionId,
			error
		});
	}
}

function* join({ token, ignore=false, onSuccess, onFail }) {
	if (ignore)
		return;

	try{
		const { cId } = yield call(Api.get, `collaborators/join?token=${token}`)

		yield put({
			type: COLLECTIONS_REFRESH_REQ
		})

		onSuccess(cId)
	} catch (error) {
		onFail(error)
	}
}