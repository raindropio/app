import normalizeURL from './url'
import { THUMB_URL, STELLA_BASE_URL } from '../../constants/app'

export default function(url='') {
    let finalURL = normalizeURL(url)
    if (!finalURL)
        return ''

    if (finalURL.includes(STELLA_BASE_URL))
        return finalURL.replace(/width=\d+/, 'a')

    return THUMB_URL+encodeURIComponent(finalURL)
}