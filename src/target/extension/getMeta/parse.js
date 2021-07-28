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

function getJsonLd() {
    try{
        return JSON.parse(document.querySelector('script[type="application/ld+json"]').innerText) || {}
    } catch(e) {
        return {}
    }
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
    let item = {
        link: location.href,
        coverId: 0
    }

    const canonical = getMeta('twitter:url', 'og:url')
    const ld = getJsonLd()

    //use json ld schema
    if (ld['@context'] == 'https://schema.org')
        item = {
            ...item,
            title: ld.name,
            excerpt: ld.description,
            cover: Array.isArray(ld.thumbnailUrl) && ld.thumbnailUrl[0]
        }
    //use open-graph or twitter cards (if page is not in state of spa)
    else if (
        location.pathname == '/' ||
        similarURL(canonical) ||
        (!window.history.length &&
        !window.history.state)
    )
        item = {
            ...item,
            title: ld.name || getMeta('twitter:title', 'og:title') || getMeta('title') || document.title,
            excerpt: ld.description || getMeta('twitter:description', 'og:description') || getMeta('description'),
            cover: getMeta('twitter:image', 'twitter:image:src', 'og:image', 'og:image:src'),
        }
    else
        throw new Error('probably this page is SPA, so data can be out of date')

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