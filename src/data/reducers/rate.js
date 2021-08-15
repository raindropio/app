import { REHYDRATE } from 'redux-persist/src/constants'
import { RATE_LOAD } from '../constants/rate'
import { USER_UPDATE_REQ, USER_LOAD_SUCCESS, USER_UPDATE_SUCCESS } from '../constants/user'
import Immutable from 'seamless-immutable'

export default function(state = initialState, action){switch (action.type) {
	case REHYDRATE:{
        let { rate=initialState } = action.payload||{}
        return rate
    }

    case RATE_LOAD:{
        const { platform='' } = action

        return state
            .set('ask',
                state.after && state.after < new Date().getTime() &&
                platform && !state.ignore_platforms.includes(platform)
            )
    }

    case USER_UPDATE_REQ:{
        const { config={} } = action.user

        //reset `ask` value when user.config.acknowledge have `rate_` key
        if (config.acknowledge && 
            Array.isArray(config.acknowledge) &&
            config.acknowledge.some(key=>key.startsWith('rate_')))
            state = state.set('ask', false)

        return state
    }

    case USER_LOAD_SUCCESS:
	case USER_UPDATE_SUCCESS:{
        //set `after` date (if not already set)
        if (!state.after){
            const after = new Date()
            after.setDate(after.getDate() + 7) //a week

            state = state.set('after', after.getTime())
        }

        //actualize ignore platforms from user.config.acknowledge
        const { config={} } = action.user
        if (config.acknowledge &&
            Array.isArray(config.acknowledge) &&
            config.acknowledge.length){
            const ignore_platforms = config.acknowledge
                .filter(key=>key.startsWith('rate_'))
                .map(key=>key.replace('rate_', ''))

            state = state.set('ignore_platforms', ignore_platforms)
        }

        return state
    }

    default:
		return state
}}

const initialState = Immutable({
    ask: false,

    after: 0, //timestamp
    ignore_platforms: []
})