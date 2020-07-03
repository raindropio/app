import { call, put, takeEvery, select } from 'redux-saga/effects'
import Api from '../../modules/api'
import ApiError from '../../modules/error'

import {
	COLLECTION_UPDATE_REQ, COLLECTION_UPDATE_ERROR,

	COLLECTION_DRAFT_LOAD_REQ, COLLECTION_DRAFT_LOAD_SUCCESS, COLLECTION_DRAFT_LOAD_ERROR, COLLECTION_DRAFT_COMMIT,
} from '../../constants/collections'

//Requests
export default function* () {
	//draft
	yield takeEvery(COLLECTION_DRAFT_LOAD_REQ, draftLoad)
	yield takeEvery(COLLECTION_DRAFT_COMMIT, draftCommit)
}

function* draftLoad({_id=0, ignore=false}) {
	if ((ignore)||(_id<=0))
		return;

	try{
		if (_id<=0)
			throw new ApiError({ status: 404 })

		const state = yield select()
		const cachedItem = state.collections.items[_id]

		//Use cached version
		const { item={}, result, ...etc } = yield call(Api.get, 'collection/'+_id)
		if (!result && !cachedItem)
			throw new ApiError(etc)

		yield put({
			type: COLLECTION_DRAFT_LOAD_SUCCESS,
			_id: _id,
			item: item || cachedItem
		});
	} catch (error) {
		yield put({
			type: COLLECTION_DRAFT_LOAD_ERROR,
			_id: _id,
			error
		});
	}
}

function* draftCommit({_id}) {
	try{
		const state = yield select()
		const changedFields = state.collections.getIn(['drafts', _id, 'changedFields'])||[]
		const item = state.collections.getIn(['drafts', _id, 'item'])

		if ((changedFields.length)&&(item)) {
			var setItem = {}
			changedFields.forEach((key)=>{
				setItem[key] = item[key]
			})

			yield put({
				type: COLLECTION_UPDATE_REQ,
				_id: _id,
				set: setItem
			})
		}
	}catch(error){
		yield put({
			type: COLLECTION_UPDATE_ERROR,
			_id: _id,
			error
		})
	}
}