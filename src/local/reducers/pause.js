import { PAUSE_SET } from '../constants'

export default function(state, action) {switch (action.type) {
	case PAUSE_SET:
		return state.set('pause', action.pause)
}}