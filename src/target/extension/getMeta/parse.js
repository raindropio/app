function getMeta() {
    for(const key of [...arguments]) {
        const elem = document.querySelector(`meta[name="${key}"], meta[property="${key}"]`)
        if (!elem) continue
        const value = String(elem.value || elem.content || '').trim().substr(0, 10000)
        if (!value) continue
        return value
    }

    return null
}

function getJsonLd() {
    let item = {}

    try{
        for(const elem of [...document.querySelectorAll('script[type="application/ld+json"]')]){
            const json = JSON.parse(elem.innerText) || {}
            if (typeof json['@context'] != 'string' || !json['@context'].includes('schema.org')) continue
            if (json.url && !similarURL(json.url)) continue

            if (json.name || json.headline){
                item = json
                break
            }
            else if (json['@graph']){
                item = json['@graph'].find(graph=>similarURL(graph.url))
                if (Object.keys(item).length) break
            }
        }
    } catch(e) {console.log(e)}

    if (Array.isArray(item.image) && item.image.length)
        item.image = { url: item.image[0] }
    else if (!item.image || !item.image.url)
        if (Array.isArray(item.thumbnailUrl) && item.thumbnailUrl.length)
            item.image = { url: item.thumbnailUrl[0] }

    return item
}

function grabImages() {
    let images = []

    try{
        let i=0
        for(const img of document.querySelectorAll('img[src]:not([src^="data"]):not([src*=".svg"])')){
            if (images.length >= 9) break
            if (!img.complete) continue
            if (!img.offsetParent) continue //is hidden
            if (i>1000) break; i++
    
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

    const canonical = getMeta('og:url', 'twitter:url')
    const ld = getJsonLd()

    //use open-graph or twitter cards (if page is not spa)
    if (
        location.pathname == '/' ||
        similarURL(canonical) ||
        !window.history.state
    )
        item = {
            ...item,
            title: getMeta('og:title', 'twitter:title') || getMeta('title') || document.title,
            excerpt: getMeta('og:description', 'twitter:description') || getMeta('description'),
            cover: getMeta('og:image', 'og:image:src', 'twitter:image', 'twitter:image:src'),
        }
    //use json ld schema
    else if (ld.name || ld.headline)
        item = {
            ...item,
            title: ld.name || ld.headline,
            excerpt: ld.description,
            cover: ld.image && ld.image.url
        }
    //fallback. do not set any data from meta tags here!!
    else
        item = {
            ...item,
            title: document.title.replace(new RegExp(`^${location.hostname.replace('www.','')}.`, 'i'), '').trim() //remove domain name from title (hi amazon!)
        }

    //validate title
    if (!item.title || /^home$/i.test(item.title))
        item.title = document.title

    //validate excerpt
    if (item.excerpt == item.title)
        item.excerpt = ''

    //validate cover url
    if (item.cover)
        try{
            item.cover = new URL(item.cover, location.href).href
        } catch(e) {
            delete item.cover
        }

    if (item.cover && !item.cover.startsWith('http'))
        delete item.cover

    //grab images
    let images = [
        ...(item.cover ? [item.cover] : []),
        ...grabImages()
    ].filter((value, index, self)=>self.indexOf(value) === index)
    
    if (!item.cover && images.length)
        item.cover = images[0]

    if (images.length)
        item.media = images.map(link=>({
            type: 'image',
            link
        }))

    //limit length
    if (item.title && item.title.length)
        item.title = item.title.substr(0, 1000)

    if (item.excerpt && item.excerpt.length)
        item.excerpt = item.excerpt.substr(0, 10000)

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