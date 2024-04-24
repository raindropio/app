import * as c from '../constants/predictions'
import wrapFunc from '../utils/wrapFunc'

export const load = ()=>({
	type: c.PREDICTIONS_LOAD_REQ
})

export const patch = (details)=>({
	type: c.PREDICTION_PATCH,
	...details
})

export const apply = (_id, onSuccess, onFail)=>({
	type: c.PREDICTION_APPLY_REQ,
	_id,
	onSuccess: wrapFunc(onSuccess),
	onFail: wrapFunc(onFail)
})