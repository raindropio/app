import { call, put, takeLatest, delay } from 'redux-saga/effects'
import Api from '../../modules/api'
import { 
	RECENT_SEARCH_LOAD_REQ, RECENT_SEARCH_LOAD_SUCCESS, RECENT_SEARCH_LOAD_ERROR,
	RECENT_SEARCH_CLEAR_REQ, RECENT_SEARCH_CLEAR_SUCCESS, RECENT_SEARCH_CLEAR_ERROR,
	SPACE_LOAD_PRE, SPACE_LOAD_SUCCESS
} from '../../constants/bookmarks'

//Requests
export default function* () {
	//search
	yield takeLatest(RECENT_SEARCH_LOAD_REQ, searchLoad)
	yield takeLatest(SPACE_LOAD_PRE, searchLoadOnce)
	yield takeLatest(SPACE_LOAD_SUCCESS, searchPostLoad)

	//search clear
	yield takeLatest(RECENT_SEARCH_CLEAR_REQ, searchClear)
}

//Search Once
let _once = false
function* searchLoadOnce() {
	if (_once) return
	_once = true

	yield delay(1000)
	yield searchLoad({})
}

//After search
function* searchPostLoad({ query={} }) {
	if (query.search){
		yield delay(1000)
		yield searchLoad({})
	}
}

//Search Load
function* searchLoad({ ignore=false }) {
	if (ignore) return

	try {
		const { items=[] } = yield call(Api.get, 'raindrops/recent/search')

		yield put({
			type: RECENT_SEARCH_LOAD_SUCCESS,
			items
		});
	} catch (error) {
		yield put({
			type: RECENT_SEARCH_LOAD_ERROR,
			error
		});
	}
}

//Search clear
function* searchClear({ ignore=false }) {
	if (ignore) return

	try {
		const { modified=0 } = yield call(Api.del, 'raindrops/recent/search')

		yield put({
			type: modified ? RECENT_SEARCH_CLEAR_SUCCESS : RECENT_SEARCH_CLEAR_ERROR
		})
	} catch (error) {
		yield put({
			type: RECENT_SEARCH_CLEAR_ERROR,
			error
		});
	}
}