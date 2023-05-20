import browser from 'webextension-polyfill'
import { normalizeURL } from '~modules/format/url'
import Api from '~data/modules/api'
import debounce from '~modules/format/callback/debounce'
import * as action from './action'

const options = {
    divider: '</-rl-/>',
    maxLinkLength: 500
}

var items = new Map()
var loading = false

//has
export function has(url) {
    return items.has(normalizeURL(url))
}

export function add(url, id) {
    items.set(url, id)
}

//getId
export function getId(url) {
    return items.get(normalizeURL(url))
}

//reload
export async function reload(force=false) {
    if (loading && !force)
        return

    loading = true
    items = new Map()

    let text = ''

    try{
        text = await Api._get('raindrops/links', {
            cache: force ? 'no-store' : 'default',
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
        const [_id, href] = line.split(options.divider)
        const url = normalizeURL(
            decodeURIComponent(
                href||''
            )
        ).substr(0, options.maxLinkLength)

        if (url)
            items.set(url, _id)
    })

    //update action badge
    action.updateBadge()
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