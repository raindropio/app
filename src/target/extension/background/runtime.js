import browser from 'webextension-polyfill'

async function onInstalled({ reason }) {
    switch(reason) {
        case 'install':
            await browser.tabs.create({
                url: 'index.html#/extension/welcome',
                active: true
            })

            localStorage.setItem('update5', true)
            break

        case 'update':
            if (localStorage.getItem('update5')==null){
                await browser.tabs.create({
                    url: 'index.html#/extension/welcome?is_update=true',
                    active: true
                })

                localStorage.setItem('update5', true)
            }
            break
    }
}

export default async function() {
    browser.runtime.onInstalled.addListener(onInstalled)
}