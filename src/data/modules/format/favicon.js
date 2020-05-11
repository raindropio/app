export default function(uri=''){
    if (!uri)
        return ''

    return `https://favicon.yandex.net/favicon/v2/${uri}?size=32`
}