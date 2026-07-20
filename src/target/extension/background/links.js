import browser from 'webextension-polyfill'
import { normalizeURL, isSPA } from '~modules/format/url'
import Api from '~data/modules/api'
import debounce from '~modules/format/callback/debounce'
import * as action from './action'

const options = {
    divider: '</-rl-/>'
}

var items = new Map()
var loaded = false
var downloading = null

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

export function has(url) {
    return items.has(simplifyURL(url))
}

export function add(url, id) {
    items.set(simplifyURL(url), id)
}

export function getId(url) {
    return items.get(simplifyURL(url))
}

//downloads only once
export async function load() {
    if (!loaded) await reload()
}

//always downloads
export async function reload() {
    if (!downloading)
        downloading = download().finally(()=>{ downloading = null })
    return downloading
}

async function download() {
    //origins access not required, 'tabs' permission is enough
    try{
        if (!await browser.permissions.contains({
            permissions: ['tabs']
        })) return
    }catch(e){}

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

    if (!text) return;

    //swap to fresh map only when fully parsed
    const next = new Map()
    for(const line of text.split('\n'))
        try {
            const [_id, href] = line.split(options.divider)
            const url = simplifyURL(
                decodeURIComponent(
                    href||''
                )
            )

            if (url)
                next.set(url, _id)
        } catch(e) {}
    items = next
    loaded = true

    action.updateBadge()
}

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

export default function () {
    browser.runtime.onMessage.removeListener(onMessage)
    browser.runtime.onMessage.addListener(onMessage)

    browser.permissions.onAdded.removeListener(reload)
    browser.permissions.onAdded.addListener(reload)

    reload()
}
