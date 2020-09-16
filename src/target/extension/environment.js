import { environment as fallbackEnvironment } from '../fallback'

export const environment = [
    ...fallbackEnvironment,
    process.env.EXTENSION_VENDOR,
    ...(location.search.includes('browser_action') ? ['browser_action'] : []),
]