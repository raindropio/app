export function getDomain(url) {
    try{
        return new URL(url).hostname
    } catch(e) {}
    return ''
}