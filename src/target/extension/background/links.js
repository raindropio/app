import browser from 'webextension-polyfill'
import normalizeURL from 'normalize-url'
import Api from '~data/modules/api'
import _ from 'lodash'

const options = {
    divider: '</-rl-/>',
    maxLinkLength: 500
}

var items = new Set()
var loading = false

//has
export function has(url) {
    return items.has(normalizeURL(url))
}

//reload
export async function reload() {
    if (loading)
        return

    loading = true
    items = new Set()

    const text = await Api._get('raindrops/links', {
        headers: {
            'Content-Type': 'text/plain'
        }
    })
    loading = false

    if (!text) return;

    text.split('\n').forEach(line=>{
        const url = normalizeURL(
            decodeURIComponent(
                line.split(options.divider)[1]||''
            )
        ).substr(0, options.maxLinkLength)

        if (url)
            items.add(url)
    })

    //send event
    document.dispatchEvent(new Event('LINKS_CHANGED'))
}

//messaging
const onMessage = _.debounce(
    async function({ type }) {
        switch(type) {
            case 'BOOKMARKS_CHANGED':
                await reload()
            break
        }
    }, 
    350, 
    { maxWait: 1000}
)

//init
export default async function () {
    await reload()

    //message
    browser.runtime.onMessage.removeListener(onMessage)
    browser.runtime.onMessage.addListener(onMessage)
}