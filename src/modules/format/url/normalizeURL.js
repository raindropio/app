import _normalizeURL from 'normalize-url'

export function normalizeURL(str) {
    try{
        return _normalizeURL(str)
    } catch(e) {
        return str
    }
}