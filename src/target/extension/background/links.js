import browser from 'webextension-polyfill'
import { normalizeURL } from '~modules/format/url'
import Api from '~data/modules/api'
import debounce from '~modules/format/callback/debounce'

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

    //do not load when no 'tabs' permission
    try{
        const havePermission = await browser.permissions.contains({
            permissions: ['tabs']
        })
        if (!havePermission)
            return
    }catch(e){}

    loading = true
    items = new Set()

    let text = ''

    try{
        text = await Api._get('raindrops/links', {
            headers: {
                'Content-Type': 'text/plain'
            },
            timeout: 0
        })
    } catch(e) {
        console.error(e)
    }
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
const onMessage = debounce(
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
export default function () {
    //message
    browser.runtime.onMessage.removeListener(onMessage)
    browser.runtime.onMessage.addListener(onMessage)
    
    reload()
}