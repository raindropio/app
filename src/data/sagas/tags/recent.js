import { call, put, takeLatest } from 'redux-saga/effects'
import Api from '../../modules/api'
import { TAGS_RECENT_LOAD_REQ, TAGS_RECENT_LOAD_SUCCESS, TAGS_RECENT_LOAD_ERROR } from '../../constants/tags'
import { BOOKMARK_LOAD_REQ, BOOKMARK_DRAFT_LOAD_REQ, BOOKMARK_UPDATE_SUCCESS } from '../../constants/bookmarks'

//Requests
export default function* () {
	yield takeLatest([ TAGS_RECENT_LOAD_REQ, BOOKMARK_UPDATE_SUCCESS ], load)
	yield takeLatest([ BOOKMARK_LOAD_REQ, BOOKMARK_DRAFT_LOAD_REQ ], maybeLoadOnce)
}

let _once = false
function* maybeLoadOnce() {
	if (_once) return
	_once = true

	yield load({})
}

function* load({ ignore=false }) {
	if (ignore)
		return;

	try {
		const { items=[] } = yield call(Api.get, 'tags/recent')

		yield put({
			type: TAGS_RECENT_LOAD_SUCCESS,
			tags: items
		});
	} catch (error) {
		yield put({
			type: TAGS_RECENT_LOAD_ERROR,
			error
		});
	}
}