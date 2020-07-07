import { call, put, debounce, takeEvery, select } from 'redux-saga/effects'
import Api from '../modules/api'
import { getSpaceQuery } from '../helpers/bookmarks'

import { FILTERS_LOAD_REQ, FILTERS_LOAD_SUCCESS, FILTERS_LOAD_ERROR } from '../constants/filters'
import { BOOKMARK_CREATE_SUCCESS, BOOKMARK_UPDATE_SUCCESS, BOOKMARK_REMOVE_SUCCESS } from '../constants/bookmarks'
import { COLLECTION_REMOVE_SUCCESS } from '../constants/collections'

//Requests
export default function* () {
	yield takeEvery([FILTERS_LOAD_REQ], reloadFilters)

	//update filters on bookmarks/collections change
	//with delay, to give server a time to recalculate them
	yield debounce(
		3500,
		[BOOKMARK_CREATE_SUCCESS, BOOKMARK_UPDATE_SUCCESS, BOOKMARK_REMOVE_SUCCESS, COLLECTION_REMOVE_SUCCESS],
		function*() {
			yield reloadFilters({ spaceId:0 })
		}
	)
}

function* reloadFilters(params) {
	if ((params.ignore)||(typeof params.spaceId == 'undefined'))
		return;

	const state = yield select()

	for(const spaceId of (Array.isArray(params.spaceId) ? params.spaceId : [params.spaceId])){
		if (parseInt(spaceId) && !state.bookmarks.spaces[spaceId]) continue

		try {
			const query = parseInt(spaceId) ? 
				getSpaceQuery(state.bookmarks, spaceId) : 
				{ string:'0' } //ignore search query for all bookmarks

			const { result=false, status, error, errorMessage, ...items} = yield call(
				Api.get, 
				'filters/'+query.string+'?tagsSort='+state.config.tags_sort
			)

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