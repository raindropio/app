import Immutable from 'seamless-immutable'
import { REHYDRATE } from 'redux-persist/src/constants'
import * as c from '../constants/backups'

export default function(state = initialState, action){switch (action.type) {
    case REHYDRATE:{
		const { backups={} } = action.payload||{}

		if (backups.status == 'loaded')
			return backups

		return state
	}

    case 'RESET':
        return initialState

    case c.BACKUPS_LOAD_REQ:{
        return state
            .set('status', 'loading')
    }

    case c.BACKUPS_LOAD_SUCCESS:{
        const { items=[] } = action

        return state
            .set('status', 'loaded')
            .set('items', items)
    }

    case c.BACKUPS_LOAD_ERROR:{
        return state
            .set('status', 'error')
            .set('items', initialState.items)
    }

    default:
		return state
}}

const initialState = Immutable({
    status: 'idle', //idle|loading|loaded|error
    items: []
})