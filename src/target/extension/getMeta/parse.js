function getMeta() {
    const elem = document.querySelector(
        [...arguments]
            .map(key=>`meta[name="${key}"], meta[property="${key}"]`)
            .join(', ')
    )
    if (!elem) return null

    const value = elem.value || elem.content
    return String(value).trim().substr(0, 10000)
}

function similarURL(url) {
    if (!url)
        return false
    const { pathname, search } = new URL(url, location.href)
    if (search && search != location.search)
        return false
    if (pathname != location.pathname)
        return false
    return true
}

function getItem() {
    let canonical = getMeta('twitter:url', 'og:url')

    if (window.history.length>1 &&
        location.pathname != '/' && 
        window.history.state &&
        !similarURL(canonical))
        throw new Error('probably this page is SPA, so data can be out of date')

    const item = {
        link: location.href,
        title: getMeta('twitter:title', 'og:title') || getMeta('title') || document.title,
        excerpt: getMeta('twitter:description', 'og:description') || getMeta('description'),
        cover: getMeta('twitter:image', 'twitter:image:src', 'og:image', 'og:image:src'),
        coverId: 0
    }

    if (item.cover)
        item.media = [{
            type: 'image',
            link: item.cover
        }]

    //remove empty keys
    for(const i in item)
        if(!item[i])
            delete item[i]

    //validate cover url
    if (item.cover)
        try{
            item.cover = new URL(item.cover, location.href).href
        } catch(e) {
            delete item.cover
        }

    return item
}

function parse() {
    try{
        return getItem()
    } 
    catch(e) {
        console.log(e)
        return {
            link: location.href,
            title: document.title
        }
    }
}

parse();