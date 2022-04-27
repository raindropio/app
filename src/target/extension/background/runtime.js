import browser from 'webextension-polyfill'

async function onInstalled({ reason }) {
    switch(reason) {
        case 'install':
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