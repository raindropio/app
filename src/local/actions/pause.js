import { PAUSE_SET } from '../constants'

export const setPause = (pause)=>({
	type: PAUSE_SET,
	pause
})