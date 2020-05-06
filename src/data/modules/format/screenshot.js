import { STELLA_BASE_URL, SCREENSHOT_URL } from '../../constants/app'

export default function(url='') {
    if (url.includes(STELLA_BASE_URL))
        return url

    return SCREENSHOT_URL+encodeURIComponent(url)
}