import { call, put, debounce, takeEvery, select, all } from 'redux-saga/effects'
import Api from '../modules/api'
import { getUrl } from '../helpers/bookmarks'

import { FILTERS_LOAD_PRE, FILTERS_LOAD_REQ, FILTERS_LOAD_SUCCESS, FILTERS_LOAD_ERROR } from '../constants/filters'
import { TAGS_LOAD_SUCCESS, TAGS_LOAD_ERROR } from '../constants/tags'
import { BOOKMARK_CREATE_SUCCESS, BOOKMARK_UPDATE_SUCCESS, BOOKMARK_REMOVE_SUCCESS, SPACE_LOAD_PRE, SPACE_REFRESH_REQ } from '../constants/bookmarks'
import { COLLECTION_REMOVE_SUCCESS } from '../constants/collections'

//Requests
export default function* () {
	yield takeEvery(FILTERS_LOAD_PRE, preLoad)
	yield takeEvery(FILTERS_LOAD_REQ, load)
	yield takeEvery([SPACE_LOAD_PRE, SPACE_REFRESH_REQ], onSpaceReload)

	//update filters on bookmarks/collections change
	yield debounce(
		500,
		[BOOKMARK_CREATE_SUCCESS, BOOKMARK_UPDATE_SUCCESS, BOOKMARK_REMOVE_SUCCESS, COLLECTION_REMOVE_SUCCESS],
		onDataChange
	)
}

//Reload space that marked as *autoLoad*
function* onSpaceReload({ spaceId, query }) {
	const { filters: { autoLoad } } = yield select()
	if (!autoLoad.includes(spaceId)) return
	
	yield put({
		type: FILTERS_LOAD_PRE,
		spaceId,
		query: query || {}
	})
}

//Reload all spaces when data changed
function* onDataChange() {
	const { filters: { autoLoad, spaces } } = yield select()

	for(const spaceId of autoLoad)
		if (spaces[spaceId])
			yield put({
				type: FILTERS_LOAD_PRE,
				spaceId,
				query: spaces[spaceId].query || {}
			})
}

//Be sure that data has changed
function* preLoad({ spaceId, ignore, query }) {
	if (ignore||typeof spaceId == 'undefined') return

	try{
		const { lastAction, version } = yield call(Api.get, `collection/${parseInt(spaceId)||0}/lastAction`)

		yield put({
			type: FILTERS_LOAD_REQ,
			spaceId,
			query,
			lastAction,
			version
		})
	} catch (error) {
		yield put({
			type: FILTERS_LOAD_ERROR,
			spaceId,
			query,
			error
		})
	}
}

//Actual load request
function* load({ spaceId, ignore, query }) {
	if (ignore||typeof spaceId == 'undefined') return

	const { config: { tags_sort } } = yield select()

	try {
		const url = getUrl(spaceId, query)

		const { tags, ...items } = yield call(
			Api.get, 
			`filters/${url}&tagsSort=${tags_sort}`
		)

		yield all([
			put({
				type: FILTERS_LOAD_SUCCESS,
				spaceId,
				items,
				query
			}),
			put({
				type: TAGS_LOAD_SUCCESS,
				spaceId,
				tags,
				query
			})
		])
	} catch (error) {
		yield all([
			put({
				type: FILTERS_LOAD_ERROR,
				spaceId,
				error,
				query
			}),
			put({
				type: TAGS_LOAD_ERROR,
				spaceId,
				error,
				query
			})
		])
	}
}