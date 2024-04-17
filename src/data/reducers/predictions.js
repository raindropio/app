import Immutable from 'seamless-immutable'
import { REHYDRATE } from 'redux-persist/src/constants'
import * as c from '../constants/predictions'

const supportedKinds = ['move', 'tag', 'untag', 'mergetags']

export default function(state = initialState, action){switch (action.type) {
    case REHYDRATE:{
		const { predictions={} } = action.payload||{}

		if (predictions.status == 'loaded')
			return predictions

		return state
	}

    case 'RESET':
        return initialState

    case c.PREDICTIONS_LOAD_REQ:{
        return state
            .set('status', 'loading')
    }

    case c.PREDICTIONS_LOAD_SUCCESS:{
        const items = (action.items||[]).filter(item=>
            supportedKinds.includes(item.kind)
        )

        return state
            .set('status', 'loaded')
            .set('items', items)
    }

    case c.PREDICTIONS_LOAD_ERROR:{
        return state
            .set('status', 'error')
            .set('items', initialState.items)
    }

    case c.PREDICTION_PATCH: {
        const { _id, ...props } = action

        return state
            .set('items', state.items.map(item=>{
                if (item._id != _id)
                    return item

                let patched = item
                for(const key in props)
                    if (typeof item[key] != 'undefined')
                        patched = patched.set(key, props[key])
                return patched
            }))
    }

    default:
		return state
}}

const initialState = Immutable({
    status: 'idle', //idle|loading|loaded|error
    items: []
})