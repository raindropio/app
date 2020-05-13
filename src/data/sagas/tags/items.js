import { call, put, takeEvery, takeLatest, all, select } from 'redux-saga/effects'
import _ from 'lodash-es'
import Api from '../../modules/api'

import {
	TAGS_LOAD_REQ, TAGS_LOAD_SUCCESS, TAGS_LOAD_ERROR,
	TAGS_SUGGESTED_LOAD_SUCCESS, TAGS_SUGGESTED_LOAD_ERROR,
	TAGS_REORDER,
} from '../../constants/tags'

import {
	BOOKMARK_DRAFT_LOAD_REQ, BOOKMARK_DRAFT_LOAD_SUCCESS,
	BOOKMARK_UPDATE_SUCCESS, BOOKMARK_REMOVE_SUCCESS
} from '../../constants/bookmarks'

import { COLLECTION_REMOVE_SUCCESS } from '../../constants/collections'
import { USER_UPDATE_REQ } from '../../constants/user'

//Requests
export default function* () {
	//Reload Tags
	yield takeLatest([TAGS_LOAD_REQ, BOOKMARK_DRAFT_LOAD_REQ], reloadTags, {force: false})
	yield takeLatest([
		BOOKMARK_UPDATE_SUCCESS,
		BOOKMARK_REMOVE_SUCCESS,
		COLLECTION_REMOVE_SUCCESS
	], reloadTags, {force: true})

	//Load Suggested tags for bookmark
	yield takeEvery(BOOKMARK_DRAFT_LOAD_SUCCESS, loadSuggestedTags)

	//Reorder persist
	yield takeLatest([TAGS_REORDER], reorder)
}

function* reloadTags({force=false}, {ignore=false}) {
	if (ignore)
		return;

	const state = yield select()
	if ((state.tags.status=='loaded')&&(!force))
		return;

	try {
		const {items=[]} = yield call(Api.get, 'tags?tagsSort='+state.config.tags_sort)

		yield put({
			type: TAGS_LOAD_SUCCESS,
			items
		});
	} catch (error) {
		yield put({
			type: TAGS_LOAD_ERROR,
			error
		});
	}
}

function* loadSuggestedTags({_id, item, ignore=false, dontLoadSuggestedTags=false}) {
	if ((ignore)||(dontLoadSuggestedTags))
		return;

	try {
		const titleDescription = _.truncate(item.title+' '+item.excerpt, {length: 700})
		const [keywords, parsed] = yield all([
			call(Api.get, `keywords?text=${encodeURIComponent(titleDescription)}&domain=${encodeURIComponent(item.domain)}`, {cache: 'force-cache'}),
			call(Api.get, 'parse?url='+encodeURIComponent(item.link), {cache: 'force-cache'})
		])

		var items = []

		if (keywords.result)
			items = items.concat(keywords.tags||[])

		if (parsed.result)
			if (parsed.item.meta)
				items = items.concat(parsed.item.meta.tags||[])

		yield put({
			type: TAGS_SUGGESTED_LOAD_SUCCESS,
			_id,
			items
		});
	} catch (error) {
		yield put({
			type: TAGS_SUGGESTED_LOAD_ERROR,
			error
		});
	}
}

function* reorder({ method }) {
	yield put({
		type: USER_UPDATE_REQ,
		user: {
			config: {
				tags_sort: method
			}
		}
	})
}