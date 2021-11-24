export async function onRequest({ request }) {
    return fetch('https://plausible.io/js/plausible.hash.exclusions.js', request)
}