import { call, put, takeEvery } from 'redux-saga/effects'
import Api from '../../modules/api'
import { BOOKMARK_HTML_LOAD_REQ, BOOKMARK_HTML_LOAD_SUCCESS, BOOKMARK_HTML_LOAD_ERROR } from '../../constants/bookmarks'

//Requests
export default function* () {
	//draft
	yield takeEvery(BOOKMARK_HTML_LOAD_REQ, load)
}

function* load({_id, ignore=false}) {
	if (ignore)
		return;

	try{
		const { item={} } = yield call(Api.get, 'raindrop/'+_id+'?html')

		yield put({
			type: BOOKMARK_HTML_LOAD_SUCCESS,
			_id,
			html: item.html
		});
	} catch (error) {
		yield put({
			type: BOOKMARK_HTML_LOAD_ERROR,
			_id,
			error
		});
	}
}