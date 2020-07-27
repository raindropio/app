import { call, put, debounce, takeEvery, select, all } from 'redux-saga/effects'
import Api from '../modules/api'
import { getUrl } from '../helpers/bookmarks'

import { FILTERS_LOAD_REQ, FILTERS_LOAD_SUCCESS, FILTERS_LOAD_ERROR, FILTERS_AUTOLOAD } from '../constants/filters'
import { TAGS_LOAD_SUCCESS, TAGS_LOAD_ERROR } from '../constants/tags'
import { BOOKMARK_CREATE_SUCCESS, BOOKMARK_UPDATE_SUCCESS, BOOKMARK_REMOVE_SUCCESS, SPACE_LOAD_REQ } from '../constants/bookmarks'
import { COLLECTION_REMOVE_SUCCESS } from '../constants/collections'

//Requests
export default function* () {
	yield takeEvery(FILTERS_LOAD_REQ, reload)
	yield takeEvery([
		BOOKMARK_CREATE_SUCCESS, BOOKMARK_UPDATE_SUCCESS, BOOKMARK_REMOVE_SUCCESS,
		SPACE_LOAD_REQ, FILTERS_AUTOLOAD
	], autoReload)

	//update filters on bookmarks/collections change
	//with delay, to give server a time to recalculate them
	yield debounce(
		3500,
		[BOOKMARK_CREATE_SUCCESS, BOOKMARK_UPDATE_SUCCESS, BOOKMARK_REMOVE_SUCCESS, COLLECTION_REMOVE_SUCCESS],
		reloadGlobal
	)
}

function* autoReload(params) {
	if (params.ignore) return;

	const { filters: { spaces } } = yield select()

	for(const spaceId of (Array.isArray(params.spaceId) ? params.spaceId : [params.spaceId]))
		if (spaces[spaceId] && spaces[spaceId].autoLoad){
			yield put({
				type: FILTERS_LOAD_REQ,
				spaceId,
				force: true
			})
		}
}

function* reloadGlobal() {
	const state = yield select()

	if (state.bookmarks.spaces['0s'])
		yield reload({ spaceId:'0s' })
}

function* reload(params) {
	if ((params.ignore)||(typeof params.spaceId == 'undefined'))
		return;

	const state = yield select()

	for(const spaceId of (Array.isArray(params.spaceId) ? params.spaceId : [params.spaceId])){
		try {
			const url = getUrl(spaceId, state.bookmarks.getIn(['spaces', spaceId, 'query']))

			const { tags, ...items } = yield call(
				Api.get, 
				`filters/${url}&tagsSort=${state.config.tags_sort}`
			)

			yield all([
				put({
					type: FILTERS_LOAD_SUCCESS,
					spaceId,
					items
				}),
				put({
					type: TAGS_LOAD_SUCCESS,
					spaceId,
					tags
				})
			])
		} catch (error) {
			yield all([
				put({
					type: FILTERS_LOAD_ERROR,
					spaceId,
					error
				}),
				put({
					type: TAGS_LOAD_ERROR,
					spaceId,
					error
				})
			])
		}
	}
}