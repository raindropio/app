import { put, takeLatest } from 'redux-saga/effects'

import {
	TAGS_REORDER,
} from '../../constants/tags'

import { USER_UPDATE_REQ } from '../../constants/user'

//Requests
export default function* () {
	//Reorder persist
	yield takeLatest([TAGS_REORDER], reorder)
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