import browser from 'webextension-polyfill'
import { normalizeURL, isSPA } from '~modules/format/url'
import Api from '~data/modules/api'
import debounce from '~modules/format/callback/debounce'
import * as action from './action'

const options = {
    divider: '</-rl-/>',
    maxLinkLength: 500
}

var items = new Map()
var loading = false

function simplifyURL(url) {
    return normalizeURL(url, {
        stripHash: !isSPA(url), //do not strip hash when it seems an SPA
        stripWWW: true,
        removeQueryParameters: [
            //tracking
            /^utm_\w+/i, 'ref', 'ref_src', 'source',
            //youtube specific
            ...(/youtube|youtu\.be/i.test(url) ? ['t'] : []),
        ]
    }).toLowerCase()
}

//has
export function has(url) {
    return items.has(simplifyURL(url))
}

export function add(url, id) {
    items.set(url, id)
}

//getId
export function getId(url) {
    return items.get(simplifyURL(url))
}

//reload
export async function reload(force=false) {
    if (loading && !force)
        return

    //do not load when no 'tabs' permission, origins access not required
    try{
        if (!await browser.permissions.contains({
            permissions: ['tabs']
        })) return
    }catch(e){}

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
        const url = simplifyURL(
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

    //permissions
    browser.permissions.onAdded.removeListener(reload)
    browser.permissions.onAdded.addListener(reload)
    
    reload()
}