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
        for(const img of document.querySelectorAll('img')){
            if (images.length >= 9) break
            if (!img.complete || !img.src || img.src.includes('.svg')) continue
            if (!img.offsetParent) continue //is hidden
    
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

    //use open-graph or twitter cards (if page is not spa)
    if (
        location.pathname == '/' ||
        similarURL(canonical) ||
        !window.history.state
    )
        item = {
            ...item,
            title: getMeta('twitter:title', 'og:title') || getMeta('title') || document.title,
            excerpt: getMeta('twitter:description', 'og:description') || getMeta('description'),
            cover: getMeta('twitter:image', 'twitter:image:src', 'og:image', 'og:image:src'),
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

    //limit length
    if (item.title && item.title.length)
        item.title = item.title.substr(0, 1000)

    if (item.excerpt && item.excerpt.length)
        item.excerpt = item.excerpt.substr(0, 10000)

    //highlights
    try {
        const selectedText = window.getSelection().getRangeAt(0).toString().trim()
        if (selectedText != '')
            item.highlights = [{ _id: String(new Date().getTime()), text: selectedText }]
    } catch(e) {}

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