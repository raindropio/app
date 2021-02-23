import { call, put, takeLatest, select } from 'redux-saga/effects'
import Api from '../../modules/api'

import {
	GROUP_CREATE, GROUP_TOGGLE, GROUP_REORDER, GROUP_REMOVE, GROUP_RENAME,
	GROUPS_SAVE_REQ, GROUPS_SAVE_SUCCESS, GROUPS_SAVE_ERROR,
	GROUP_APPEND_COLLECTION, GROUP_REMOVE_COLLECTION,
	COLLECTION_REMOVE_SUCCESS
} from '../../constants/collections'

//Requests
export default function* () {
	//groups
	yield takeLatest([
		GROUP_CREATE,
		GROUP_RENAME,
		GROUP_TOGGLE,
		GROUP_REORDER,
		GROUP_REMOVE,
		GROUP_APPEND_COLLECTION,
		GROUP_REMOVE_COLLECTION,
		GROUPS_SAVE_REQ,
		COLLECTION_REMOVE_SUCCESS
	], saveGroups)
}

function* saveGroups({ignore=false, onSuccess, onFail}) {
	if (ignore) return;

	try{
		const state = yield select()
		const groups = state.collections.groups||[]

		const { user = {} } = yield call(Api.put, 'user', {groups: groups})

		yield put({
			type: GROUPS_SAVE_SUCCESS,
			groups: user.groups||[],
			onSuccess, onFail
		})
	}catch(error){
		yield put({
			type: GROUPS_SAVE_ERROR,
			error,
			onSuccess, onFail
		})
	}
}