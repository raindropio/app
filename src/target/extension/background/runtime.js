import browser from 'webextension-polyfill'

async function onInstalled({ reason }) {
    switch(reason) {
        case 'install':
            await browser.tabs.create({
                url: 'index.html#/extension/welcome',
                active: true
            })
            break

        case 'update':
            if (localStorage.getItem('update5')==null){
                localStorage.setItem('update5', true)

                await browser.tabs.create({
                    url: 'index.html#/extension/welcome?is_update=true',
                    active: true
                })
            }
            break
    }
}

export default async function() {
    browser.runtime.onInstalled.addListener(onInstalled)
}