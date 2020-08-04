import { WORKERS_BASE_URL, LEGACY_WORKERS_BASE_URL, RENDER_URL } from '../../constants/app'

export default function(url='') {
    if (url.includes(WORKERS_BASE_URL) ||
        url.includes(LEGACY_WORKERS_BASE_URL))
        return url

    return RENDER_URL+encodeURIComponent(url)
}