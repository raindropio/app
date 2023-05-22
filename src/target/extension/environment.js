import { environment as fallbackEnvironment } from '../fallback'

export const environment = [
    ...fallbackEnvironment,
    process.env.EXTENSION_VENDOR,
    ...(location.search.includes('action') ? ['action'] : []),
    ...(location.pathname.includes('sidepanel.html') ? ['sidepanel'] : []),
]