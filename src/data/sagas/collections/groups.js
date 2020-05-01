import { call, put, takeLatest, select } from 'redux-saga/effects'
import Api from '../../modules/api'
import ApiError from '../../modules/error'

import {
	GROUP_CREATE, GROUP_TOGGLE, GROUP_REORDER, GROUP_REMOVE, GROUP_RENAME,
	GROUPS_SAVE_REQ, GROUPS_SAVE_SUCCESS, GROUPS_SAVE_ERROR,
	GROUP_APPEND_COLLECTION, GROUP_REMOVE_COLLECTION,
	COLLECTIONS_REORDER, COLLECTION_REMOVE_SUCCESS
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
		COLLECTIONS_REORDER,
		COLLECTION_REMOVE_SUCCESS
	], saveGroups)
}

function* saveGroups({ignore=false, onSuccess, onFail}) {
	if (ignore) return;

	try{
		const state = yield select()
		const groups = state.collections.groups||[]

		const {result = false, item = {}, error, errorMessage} = yield call(Api.put, 'userConfig', {groups: groups})

		if (!result)
			throw new ApiError(error, errorMessage||'save_groups_error')

		yield put({
			type: GROUPS_SAVE_SUCCESS,
			groups: item.groups||[],
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