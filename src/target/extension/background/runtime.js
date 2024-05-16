import browser from 'webextension-polyfill'
import { environment } from '../environment'

async function onInstalled({ reason }) {
    switch(reason) {
        case 'install':
            if (!environment.includes('safari'))
                await browser.tabs.create({
                    url: '/welcome/index.html',
                    active: true
                })
            break
    }
}

export default function() {
    browser.runtime.onInstalled.addListener(onInstalled)
}