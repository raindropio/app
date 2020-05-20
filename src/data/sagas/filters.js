import { call, put, debounce, select } from 'redux-saga/effects'
import Api from '../modules/api'
import ApiError from '../modules/error'
import { getSpaceQuery } from '../helpers/bookmarks'

import { BOOKMARK_UPDATE_SUCCESS, BOOKMARK_REMOVE_SUCCESS } from '../constants/bookmarks'
import { FILTERS_LOAD_REQ, FILTERS_LOAD_SUCCESS, FILTERS_LOAD_ERROR } from '../constants/filters'

//Requests
export default function* () {
	yield debounce(1000, [
		FILTERS_LOAD_REQ,
		BOOKMARK_UPDATE_SUCCESS,
		BOOKMARK_REMOVE_SUCCESS
	], reloadFilters)
}

function* reloadFilters(params) {
	if ((params.ignore)||(typeof params.spaceId == 'undefined'))
		return;

	const state = yield select()

	for(const spaceId of (Array.isArray(params.spaceId) ? params.spaceId : [params.spaceId])){
		const query = getSpaceQuery(state.bookmarks, spaceId);

		try {
			const {result=false, error, errorMessage, ...items} = yield call(
				Api.get, 
				'filters/'+query.string+'?tagsSort='+state.config.tags_sort
			)

			if (!result)
				throw new ApiError(error, errorMessage||'cant load filters')

			yield put({
				type: FILTERS_LOAD_SUCCESS,
				spaceId,
				...items
			});
		} catch (error) {
			yield put({
				type: FILTERS_LOAD_ERROR,
				spaceId,
				error
			});
		}
	}
}