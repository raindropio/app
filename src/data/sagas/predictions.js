import { put, takeLatest, call, select } from 'redux-saga/effects'
import * as c from '../constants/predictions'
import Api from '../modules/api'

export default function* () {
	yield takeLatest(c.PREDICTIONS_LOAD_REQ, load)
	yield takeLatest(c.PREDICTION_APPLY_REQ, apply)
}

function* load() {
    try {
		const { predictions, raindrops } = yield call(Api.get, 'predictions?version=1')

		yield put({
			type: c.PREDICTIONS_LOAD_SUCCESS,
			predictions,
			raindrops
		})
	} catch (error) {
		yield put({
			type: c.PREDICTIONS_LOAD_ERROR,
			error
		})
	}
}

function* apply({ _id, onSuccess, onFail }) {
	try {
		const state = yield select()
		const prediction = state.predictions.items.find(item=>item._id==_id)
		if (!prediction) return

		yield put({ type: c.PREDICTION_APPLY_SUCCESS, _id })
		yield call(Api.post, `prediction/${_id}`, prediction)
		yield put({ type: c.PREDICTION_APPLY_SUCCESS, _id })

		if (typeof onSuccess == 'function')
			onSuccess()
	} catch (error) {
		if (typeof onFail == 'function')
			onFail(error)

		yield put({ type: c.PREDICTIONS_LOAD_REQ })
		yield put({
			type: c.PREDICTION_APPLY_ERROR,
			_id,
			error
		})
	}
}