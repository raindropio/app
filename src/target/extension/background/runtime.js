import browser from 'webextension-polyfill'

async function onInstalled({ reason }) {
    switch(reason) {
        case 'install':
            await browser.tabs.create({
                url: 'index.html#/extension/welcome',
                active: true
            })
            break
    }
}

export default async function() {
    browser.runtime.onInstalled.addListener(onInstalled)
}