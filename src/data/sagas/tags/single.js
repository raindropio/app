import { call, put, takeEvery } from 'redux-saga/effects'
import Api from '../../modules/api'

import {
	TAG_RENAME_REQ, TAG_RENAME_SUCCESS, TAG_RENAME_ERROR,
	TAG_REMOVE_REQ, TAG_REMOVE_SUCCESS, TAG_REMOVE_ERROR
} from '../../constants/tags'

//Requests
export default function* () {
	//single
	yield takeEvery(TAG_RENAME_REQ, renameTag)
	yield takeEvery(TAG_REMOVE_REQ, removeTag)
}

function* renameTag({tagName, newName, ignore=false, onSuccess, onFail}) {
	if ((ignore)||(!tagName))
		return;

	try{
		const {result} = yield call(Api.put, 'tags', {tag: tagName, replace: newName})
		if (!result)
			throw new Error('cant update tag')

		yield put({
			type: TAG_RENAME_SUCCESS,
			tagName,
			newName,
			onSuccess, onFail
		});
	} catch (error) {
		yield put({
			type: TAG_RENAME_ERROR,
			tagName,
			error,
			onSuccess, onFail
		});
	}
}

function* removeTag({tagName, ignore=false, onSuccess, onFail}) {
	if ((ignore)||(!tagName))
		return;

	try{
		const {result} = yield call(Api.del, 'tag?tag='+tagName)
		if (!result)
			throw new Error('cant remove tag')

		yield put({
			type: TAG_REMOVE_SUCCESS,
			tagName,
			onSuccess, onFail
		});
	} catch (error) {
		yield put({
			type: TAG_REMOVE_ERROR,
			tagName,
			error,
			onSuccess, onFail
		});
	}
}