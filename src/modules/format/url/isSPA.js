export function isSPA(url) {
    try {
        return new URL(url).hash.includes('/')
    } catch {
        return false
    }
}