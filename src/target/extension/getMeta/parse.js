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
    let item = {}

    try{
        const json = JSON.parse(document.querySelector('script[type="application/ld+json"]').innerText) || {}
        if (json['@context'] == 'https://schema.org'){
            if (json.name)
                item = json
            else if (json['@graph'])
                item = json['@graph'].find(graph=>similarURL(graph.url))
        }
    } catch(e) {console.log(e)}

    if (!item.image || !item.image.url)
        if (Array.isArray(item.thumbnailUrl) && item.thumbnailUrl.length)
            item.image = { url: item.thumbnailUrl[0] }

    return item
}

function grabImages() {
    let images = []

    try{
        for(const img of document.querySelectorAll('img')){
            if (images.length >= 9) break
            if (!img.complete || !img.src || img.src.includes('.svg')) continue
    
            const width = Math.min(img.naturalWidth, img.width)
            const height = Math.min(img.naturalHeight, img.height)
    
            if (width > 100 && height > 100){
                let url
                try{ url = new URL(img.currentSrc || img.src, location.href).href } catch(e){}
                if (url) images.push(url)
            }
        }
    } catch(e) {console.log(e)}

    return images
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
        link: location.href
    }

    const canonical = getMeta('twitter:url', 'og:url')
    const ld = getJsonLd()

    //use json ld schema
    if (ld.name)
        item = {
            ...item,
            title: ld.name,
            excerpt: ld.description,
            cover: ld.image && ld.image.url
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
        item = {
            title: document.title
        }

    //validate cover url
    if (item.cover)
        try{
            item.cover = new URL(item.cover, location.href).href
        } catch(e) {
            delete item.cover
        }

    //grab images
    let images = [
        ...(item.cover ? [item.cover] : []),
        ...grabImages()
    ].filter((value, index, self)=>self.indexOf(value) === index)

    if (images.length)
        item.media = images.map(link=>({
            type: 'image',
            link
        }))

    //remove empty keys
    for(const i in item)
        if(!item[i])
            delete item[i]

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