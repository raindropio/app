import { call, put, debounce, takeEvery, select, all } from 'redux-saga/effects'
import Api from '../modules/api'
import { getUrl } from '../helpers/bookmarks'

import { FILTERS_LOAD_REQ, FILTERS_LOAD_SUCCESS, FILTERS_LOAD_ERROR } from '../constants/filters'
import { TAGS_LOAD_SUCCESS, TAGS_LOAD_ERROR } from '../constants/tags'
import { BOOKMARK_CREATE_SUCCESS, BOOKMARK_UPDATE_SUCCESS, BOOKMARK_REMOVE_SUCCESS, SPACE_LOAD_PRE, SPACE_REFRESH_REQ } from '../constants/bookmarks'
import { COLLECTION_REMOVE_SUCCESS } from '../constants/collections'

//Requests
export default function* () {
	yield takeEvery(FILTERS_LOAD_REQ, doLoad)
	yield takeEvery([SPACE_LOAD_PRE, SPACE_REFRESH_REQ], doAutoLoad)

	//update filters on bookmarks/collections change
	//with delay, to give server a time to recalculate them
	yield debounce(
		3500,
		[BOOKMARK_CREATE_SUCCESS, BOOKMARK_UPDATE_SUCCESS, BOOKMARK_REMOVE_SUCCESS, COLLECTION_REMOVE_SUCCESS],
		doForceReload
	)
}

//Reload spaces that marked as *autoLoad*
function* doAutoLoad({ spaceId, query }) {
	const { filters: { autoLoad } } = yield select()
	
	const actions = (Array.isArray(spaceId) ? spaceId : [spaceId])
		.filter(spaceId=>
			autoLoad.includes(spaceId)
		)
		.map(spaceId=>
			put({
				type: FILTERS_LOAD_REQ,
				spaceId,
				query: query || {}
			})
		)

	if (actions.length)
		yield all(actions)
}

//Force reload
function* doForceReload() {
	const { filters: { autoLoad, spaces } } = yield select()

	const actions = autoLoad
		.filter(spaceId=>
			spaces[spaceId]
		)
		.map(spaceId=>
			put({
				type: FILTERS_LOAD_REQ,
				spaceId,
				query: spaces[spaceId].query || {},
				force: true
			})
		)

	if (actions.length)
		yield all(actions)
}

//Actual load request
function* doLoad(params) {
	if ((params.ignore)||(typeof params.spaceId == 'undefined'))
		return;

	const { config: { tags_sort } } = yield select()

	for(const spaceId of (Array.isArray(params.spaceId) ? params.spaceId : [params.spaceId])){
		try {
			const url = getUrl(spaceId, params.query)

			const { tags, ...items } = yield call(
				Api.get, 
				`filters/${url}&tagsSort=${tags_sort}`
			)

			yield all([
				put({
					type: FILTERS_LOAD_SUCCESS,
					spaceId,
					items,
					query: params.query
				}),
				put({
					type: TAGS_LOAD_SUCCESS,
					spaceId,
					tags,
					query: params.query
				})
			])
		} catch (error) {
			yield all([
				put({
					type: FILTERS_LOAD_ERROR,
					spaceId,
					error,
					query: params.query
				}),
				put({
					type: TAGS_LOAD_ERROR,
					spaceId,
					error,
					query: params.query
				})
			])
		}
	}
}