export default function lastPart(str) {
    const parts = (str||'').split(/\s+/)
    return ((parts[parts.length-1])||'').trim()
}