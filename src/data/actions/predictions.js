import * as c from '../constants/predictions'

export const load = ()=>({
	type: c.PREDICTIONS_LOAD_REQ
})

export const patch = (details)=>({
	type: c.PREDICTION_PATCH,
	...details
})