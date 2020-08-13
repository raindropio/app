export const normalizeClient = function(client) {
    return {
        _id: String(client._id),
        name: client.name || '',
        icon: client.icon || '',
        site: client.site || '',
        description: client.description || '',

        redirects: client.redirects || [],
        secret: client.secret || ''
    }
}