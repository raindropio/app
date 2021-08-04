import browser from 'webextension-polyfill'
import js from './portal.js?raw'

async function init() {
    const [ready] = await browser.tabs.executeScript(null, {
        code: 'window.rdportal'
    })
    if (ready) return
    
    await browser.tabs.executeScript(null, { code: `
        ${js}
        window.rdportal.page = '${await browser.runtime.getURL('portal.html')}'
    ` })
}

/*
    path: /add
    type: modal | browser_action
*/
export async function open(path, type='modal') {
    await init()
    await browser.tabs.executeScript(null, { code: `window.rdportal.open('${path}', '${type}')` })
}