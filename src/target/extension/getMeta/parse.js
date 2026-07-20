//top-level must stay function declarations only: the script can be injected into the same page twice

//everything in the ssr html (meta tags, json-ld) can describe a previous page if the url
//changed after the document was loaded (spa navigation).
//history.state can't detect this: navigation api and pushState(null) leave it empty (hi reddit!)
function softNavigated() {
    try{
        const doc = performance.getEntriesByType('navigation')[0]
        return doc ? !samePath(new URL(doc.name).pathname) : false
    } catch(e) {
        return false
    }
}

function samePath(pathname) {
    const trim = path => path.replace(/\/+$/, '')
    return trim(pathname) == trim(location.pathname)
}

function similarURL(url) {
    if (!url) //'' would resolve to location.href itself
        return false
    try{
        const { pathname, search } = new URL(url, location.href)
        if (search && search != location.search)
            return false
        return samePath(pathname)
    } catch(e) {
        return false
    }
}

function getMeta(...keys) {
    const elem = [...document.querySelectorAll(
        keys.map(key=>`meta[name="${key}"], meta[property="${key}"]`).join(', ')
    )].at(-1) //last occurrence, spa sites often append fresh tags after the ssr ones
    if (!elem || !elem.content) return null
    return String(elem.content).trim().slice(0, 10000)
}

function getJsonLd() {
    let item = {}

    search:
    for(const elem of document.querySelectorAll('script[type="application/ld+json"]')){
        try{ //one broken script should not stop the others
            const json = JSON.parse(elem.textContent)

            //single schema or an array of schemas
            for(const one of Array.isArray(json) ? json : [json]){
                if (!one || !String(one['@context']).includes('schema.org')) continue
                if (one.url && !similarURL(one.url)) continue
                if (one['@id'] && URL.canParse(one['@id']) && !similarURL(one['@id'])) continue

                if (one.name || one.headline){
                    //stale page: only trust a schema confirmed by the url/@id checks above
                    if (softNavigated() && !one.url && !(one['@id'] && URL.canParse(one['@id']))) continue
                    item = one
                }
                else if (Array.isArray(one['@graph']))
                    //graph entries always prove themselves by url
                    item = one['@graph'].find(graph=>graph && similarURL(graph.url)) || {}

                if (Object.keys(item).length) break search
            }
        } catch(e) {console.log(e)}
    }

    //image can be a string, an object, or an array of those
    const img = [].concat(item.image || [])[0]
    item.image = { url: (img && img.url) || img }
    if (!item.image.url && Array.isArray(item.thumbnailUrl) && item.thumbnailUrl.length)
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
            if (img.closest('header, footer, aside')) continue //minor image

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

function htmlDecode(input) {
    try {
        var doc = new DOMParser().parseFromString(input||'', 'text/html');
        return doc.documentElement.textContent;
    } catch(e) {
        console.error(e)
        return input
    }
}

function getItem() {
    //ssr meta tags are trusted on a fresh page, or when the site proves it keeps them in sync
    //with spa navigation: og:url matches, or og:title matches the live document.title.
    //<link rel="canonical"> must NOT count as proof: youtube keeps it in sync while og tags stay stale
    const trustMeta = !softNavigated()
        || similarURL(getMeta('twitter:url', 'og:url'))
        || getMeta('twitter:title', 'og:title') == document.title.trim()
    const meta = (...keys) => trustMeta ? getMeta(...keys) : null
    const ld = getJsonLd()

    let item = {
        link: location.href,
        title: meta('twitter:title', 'og:title') || meta('title')
            || htmlDecode(ld.name || ld.headline)
            || document.title.replace(new RegExp(`^${location.hostname.replace('www.','')}.`, 'i'), '').trim(), //strip domain prefix (hi amazon!)
        excerpt: meta('twitter:description', 'og:description') || meta('description')
            || htmlDecode(ld.description),
        cover: meta('twitter:image', 'twitter:image:src', 'og:image', 'og:image:src')
            || ld.image.url
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

    if (images.length) {
        item.media = images.map(link=>({
            type: 'image',
            link
        }))

        if (!item.cover)
            item.cover = images[0]
    }

    //limit length
    if (item.title)
        item.title = item.title.slice(0, 1000)

    if (item.excerpt)
        item.excerpt = item.excerpt.slice(0, 10000)

    //highlights
    try {
        const selectedText = window.getSelection().getRangeAt(0).toString().trim()
        if (selectedText != '')
            item.highlights = [{ _id: String(Date.now()), text: selectedText }]
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
