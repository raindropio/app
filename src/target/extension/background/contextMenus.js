import browser from 'webextension-polyfill'
import { open } from './portal'
import { addCurrentTabSelection } from './highlights'
import { environment } from '../environment'

async function onClicked({ menuItemId, pageUrl, srcUrl, linkUrl }, ) {
    switch(menuItemId) {
        case 'save_page':
            return open(`/add?link=${encodeURIComponent(pageUrl)}`)

        case 'save_link':
            return open(`/add?link=${encodeURIComponent(linkUrl)}`)

        case 'save_video':
            return open(`/add?link=${encodeURIComponent(srcUrl)}`)

        case 'save_image':
            return open(`/add?link=${encodeURIComponent(srcUrl)}`)

        case 'save_highlight':
            return addCurrentTabSelection()
    }
}

async function init() {
    //remove all to be sure
    try{
        await browser.contextMenus.removeAll()
    } catch (e) {}

    const suffix = (environment.includes('safari')?` ${browser.i18n.getMessage('in')} Raindrop.io`:'')

    //create
    await Promise.all([
        browser.contextMenus.create({
            id: 'save_page',
            title: browser.i18n.getMessage('savePage')+suffix,
            contexts: ['page']
        }),
        browser.contextMenus.create({
            id: 'save_link',
            title: browser.i18n.getMessage('saveLink')+suffix,
            contexts: ['link']
        }),
        browser.contextMenus.create({
            id: 'save_video',
            title: browser.i18n.getMessage('saveVideo')+suffix,
            contexts: ['video']
        }),
        browser.contextMenus.create({
            id: 'save_image',
            title: browser.i18n.getMessage('saveImage')+suffix,
            contexts: ['image']
        }),
        browser.contextMenus.create({
            id: 'save_highlight',
            title: browser.i18n.getMessage('saveHighlight')+suffix,
            contexts: ['selection']
        })
    ])
}

export default function() {
    if (!browser.contextMenus) return

    init()

    //event
    browser.contextMenus.onClicked.removeListener(onClicked)
    browser.contextMenus.onClicked.addListener(onClicked)      
}