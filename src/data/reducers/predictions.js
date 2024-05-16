import Immutable from 'seamless-immutable'
import { REHYDRATE } from 'redux-persist/src/constants'
import * as c from '../constants/predictions'

const supportedKinds = ['move', 'tag', 'mergetags']

export default function(state = initialState, action){switch (action.type) {
    case REHYDRATE:{
		const { predictions={} } = action.payload||{}

		if (predictions.status == 'loaded')
			return predictions.set('apply_status', {})

		return state
	}

    case 'RESET':
        return initialState

    case c.PREDICTIONS_LOAD_REQ:{
        return state
            .set('status', 'loading')
            .set('updateDate', null)
    }

    case c.PREDICTIONS_LOAD_SUCCESS:{
        const items = (action.predictions||[])
            .filter(item=>supportedKinds.includes(item.kind))

        return state
            .set('status', 'loaded')
            .set('items', items)
            .set('updateDate', action.updateDate)
    }

    case c.PREDICTIONS_LOAD_ERROR:{
        return state
            .set('status', 'error')
            .set('items', initialState.items)
    }

    case c.PREDICTION_PATCH: {
        const { _id, ...props } = action

        return state
            .set('items', state.items
                .map(item=>{
                    if (item._id != _id)
                        return item

                    let patched = item
                    for(const key in props)
                        if (typeof item[key] != 'undefined')
                            patched = patched.set(key, props[key])
                    return patched
                })
                .filter(item=>item.raindropRefs ? item.raindropRefs.length : true)
            )
    }

    case c.PREDICTION_APPLY_REQ:{
        const { _id } = action
        return state.setIn(['apply_status', _id], 'loading')
    }

    case c.PREDICTION_APPLY_SUCCESS: {
        const { _id } = action
        return state.setIn(['apply_status', _id], 'success')
    }

    case c.PREDICTION_APPLY_ERROR: {
        const { _id } = action
        return state.setIn(['apply_status', _id], 'error')
    }

    default:
		return state
}}

const initialState = Immutable({
    status: 'idle', //idle|loading|loaded|error
    items: [],
    updateDate: null,
    apply_status: {} // _id: loading|success|error
})