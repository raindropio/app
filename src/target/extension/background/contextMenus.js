import browser from 'webextension-polyfill'
import { openAdd } from './utils'

async function onClicked({ menuItemId, pageUrl, srcUrl, linkUrl, linkText, selectionText }) {
    switch(menuItemId) {
        case 'save_page':{
            let title

            try{
                const [ tab ] = await browser.tabs.query({ active: true, currentWindow: true })
                title = tab.title
            } catch(e) {}
            
            return openAdd({ link: pageUrl, title: title||'' })
        }

        case 'save_link':
            return openAdd({ link: linkUrl, title: linkText||selectionText||'' })

        case 'save_video':
            return openAdd({ link: srcUrl })

        case 'save_image':
            return openAdd({ link: srcUrl })
    }
}

export default async function() {
    //remove all to be sure
    try{
        await browser.contextMenus.removeAll()
    } catch (e) {}

    //create
    await Promise.all([
        browser.contextMenus.create({
            id: 'save_page',
            title: browser.i18n.getMessage('savePage'),
            contexts: ['page']
        }),
        browser.contextMenus.create({
            id: 'save_link',
            title: browser.i18n.getMessage('saveLink'),
            contexts: ['link']
        }),
        browser.contextMenus.create({
            id: 'save_video',
            title: browser.i18n.getMessage('saveVideo'),
            contexts: ['video']
        }),
        browser.contextMenus.create({
            id: 'save_image',
            title: browser.i18n.getMessage('saveImage'),
            contexts: ['image']
        })
    ])

    //event
    browser.contextMenus.onClicked.removeListener(onClicked)
    browser.contextMenus.onClicked.addListener(onClicked)      
}