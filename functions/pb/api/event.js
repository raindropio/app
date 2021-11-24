export async function onRequest({ request }) {
    return fetch('https://plausible.io/api/event', request)
}