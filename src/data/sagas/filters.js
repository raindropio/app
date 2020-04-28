import { call, put, takeEvery, select } from 'redux-saga/effects'
import Api from '../modules/api'
import ApiError from '../modules/error'
import { getSpaceQuery } from '../helpers/bookmarks'

import {
	BOOKMARK_UPDATE_SUCCESS,
	BOOKMARK_REMOVE_SUCCESS
} from '../constants/bookmarks'

import {
	FILTERS_LOAD_REQ, FILTERS_LOAD_SUCCESS, FILTERS_LOAD_ERROR
} from '../constants/filters'

//Requests
export default function* () {
	yield takeEvery([
		FILTERS_LOAD_REQ,
		BOOKMARK_UPDATE_SUCCESS,
		BOOKMARK_REMOVE_SUCCESS
	], reloadFilters)
}

function* reloadFilters({spaceId, ignore=false}) {
	if ((ignore)||(typeof spaceId == 'undefined'))
		return;

	const state = yield select()
	const query = getSpaceQuery(state.bookmarks, spaceId);

	try {
		const {tags=[], types=[], important={}, broken={}, best={}, result=false, error, errorMessage} = yield call(Api.get, 'filters/'+query.string);

		if (!result)
			throw new ApiError(error, errorMessage||'cant load filters')

		yield put({
			type: FILTERS_LOAD_SUCCESS,
			spaceId: spaceId,
			tags, types, 
			important: important.count, 
			broken: broken.count, 
			best: best.count
		});
	} catch (error) {
		yield put({
			type: FILTERS_LOAD_ERROR,
			spaceId: spaceId,
			error
		});
	}
}