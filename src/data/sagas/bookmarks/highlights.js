import { put, takeEvery } from 'redux-saga/effects'
import {
    BOOKMARK_HIGHLIGH_ADD, BOOKMARK_HIGHLIGH_UPDATE, BOOKMARK_HIGHLIGH_REMOVE,
    BOOKMARK_UPDATE_REQ
} from '../../constants/bookmarks'

//Requests
export default function* () {
	yield takeEvery(BOOKMARK_HIGHLIGH_ADD, add)
    yield takeEvery(BOOKMARK_HIGHLIGH_UPDATE, update)
    yield takeEvery(BOOKMARK_HIGHLIGH_REMOVE, remove)
}

function* add({ bookmarkId, newOne, ignore=false }) {
	if (ignore) return;

    yield put({
        type: BOOKMARK_UPDATE_REQ,
        _id: bookmarkId,
        set: {
            highlights: [newOne]
        }
    })
}

function* update({ bookmarkId, _id, changed, ignore=false }) {
	if (ignore) return;

    yield put({
        type: BOOKMARK_UPDATE_REQ,
        _id: bookmarkId,
        set: {
            highlights: [{
                ...changed,
                _id
            }]
        }
    })
}

function* remove({ bookmarkId, _id, ignore=false }) {
	if (ignore) return;

    yield put({
        type: BOOKMARK_UPDATE_REQ,
        _id: bookmarkId,
        set: {
            highlights: [{
                _id,
                text: ''
            }]
        }
    })
}