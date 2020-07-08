import { call, put, takeEvery, takeLatest, debounce, all, select } from 'redux-saga/effects'
import _ from 'lodash-es'
import Api from '../../modules/api'

import {
	TAGS_SUGGESTED_LOAD_SUCCESS, TAGS_SUGGESTED_LOAD_ERROR,
	TAGS_REORDER,
} from '../../constants/tags'

import { BOOKMARK_DRAFT_LOAD_SUCCESS } from '../../constants/bookmarks'
import { USER_UPDATE_REQ } from '../../constants/user'

//Requests
export default function* () {
	//Load Suggested tags for bookmark
	yield takeEvery(BOOKMARK_DRAFT_LOAD_SUCCESS, loadSuggestedTags)

	//Reorder persist
	yield takeLatest([TAGS_REORDER], reorder)
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

		var tags = []

		if (keywords.result)
			tags = tags.concat(keywords.tags||[])

		if (parsed.result)
			if (parsed.item.meta)
				tags = tags.concat(parsed.item.meta.tags||[])

		yield put({
			type: TAGS_SUGGESTED_LOAD_SUCCESS,
			_id,
			tags
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