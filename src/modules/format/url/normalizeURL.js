import _normalizeURL from 'normalize-url'

export function normalizeURL(str, options) {
    try{
        return _normalizeURL(str, options)
    } catch(e) {
        return str
    }
}