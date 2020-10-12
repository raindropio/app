import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
import _ from 'lodash-es'
import Api from '../../modules/api'
import ApiError from '../../modules/error'

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

	if (!item ||
		!item.title ||
		!item.link)
		return;

	try {
		const titleDescription = _.truncate((item.title||'')+' '+(item.excerpt||''), {length: 700}).trim()
		const [keywords, parsed] = yield all([
			call(Api.get, `keywords?text=${encodeURIComponent(titleDescription)}&domain=${encodeURIComponent(item.domain||'')}`),
			call(Api.get, 'parse?url='+encodeURIComponent(item.link))
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
		//ignore auth error
		if (typeof error == 'object' &&
			error instanceof ApiError &&
			error.status==401)
			return

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