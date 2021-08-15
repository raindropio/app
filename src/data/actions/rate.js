import { RATE_LOAD } from '../constants/rate'
import { CONFIG_ACKNOWLEDGE } from '../constants/config'

//platform: extension_(chrome|opera|edge|safari|firefox), mobile_(ios|android)
export const load = platform=>({
	type: RATE_LOAD,
    platform
})

export const acknowledge = platform=>({
	type: CONFIG_ACKNOWLEDGE,
	key: `rate_${platform}`
})