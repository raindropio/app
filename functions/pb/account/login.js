export async function onRequest({ request }) {
    const res = await fetch(request)
    
    return new Response(res.body, {
        status: 401,
        headers: res.headers
    })
}