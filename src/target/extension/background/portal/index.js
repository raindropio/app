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

const onMessage = function({ type }) {
    switch(type) {
        case 'CAPTURE_TAB_START':
            return hide()

        case 'CAPTURE_TAB_END':
            return show()
    }
}

/*
    path: /add
    type: modal | browser_action
*/
export async function open(path, type='modal') {
    await init()
    await browser.tabs.executeScript(null, { code: `window.rdportal.open('${path}', '${type}')` })
}

export async function show() {
    return browser.tabs.executeScript(null, { code: 'window.rdportal.show()' })
}

export async function hide() {
    return browser.tabs.executeScript(null, { code: 'window.rdportal.hide()' })
}

export default function() {
    browser.runtime.onMessage.removeListener(onMessage)
    browser.runtime.onMessage.addListener(onMessage)
}