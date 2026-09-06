import browser from 'webextension-polyfill'
import config from '~config'
import { open } from './action'
import { addCurrentTabSelection } from './highlights'
import { environment } from '../environment'
import Api from '~data/modules/api'
import { createRaindrop } from '~data/helpers/bookmarks'
import * as links from './links'
import * as action from './action'

async function quickSave(link) {
    if (!link) return false

    let config
    try {
        ({ user: { config } } = await Api._get('user'))
    } catch(e) { return false }

    if (!config.add_auto_save_context_menu)
        return false

    try {
        const item = await createRaindrop({
            link,
            collectionId: config.add_default_collection || config.last_collection || -1
        })

        links.add(link, item._id)
        action.updateBadge().catch(console.error)

        return true
    } catch(e) {
        console.error(e)
        return false
    }
}

async function onClicked({ menuItemId, pageUrl, srcUrl, linkUrl }, { windowId }) {
    switch(menuItemId) {
        case 'save_page':
            if (await quickSave(pageUrl)) return
            return open(`/add?link=${encodeURIComponent(pageUrl)}`)

        case 'save_link':
            if (await quickSave(linkUrl)) return
            return open(`/add?link=${encodeURIComponent(linkUrl)}`)

        case 'save_video':
            if (await quickSave(srcUrl)) return
            return open(`/add?link=${encodeURIComponent(srcUrl)}`)

        case 'save_image':
            if (await quickSave(srcUrl)) return
            return open(`/add?link=${encodeURIComponent(srcUrl)}`)

        case 'save_highlight':
            return addCurrentTabSelection()

        case 'save_tabs':
            return open('/extension/tabs/-1')

        case 'open_app':
            return browser.tabs.create({
                url: config.links.app.index,
                active: true
            })

        case 'settings':
            return open('/settings')

        case 'execute_side_panel':
            if (browser.sidePanel)
                return browser.sidePanel.open({ windowId })
            else if (browser.sidebarAction)
                return browser.sidebarAction.open()
            else
                break
    }
}

async function init() {
    //remove all to be sure
    try{
        await browser.contextMenus.removeAll()
    } catch (e) {}

    const suffix = (environment.includes('safari')?` ${browser.i18n.getMessage('in')}`:'')

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
        }),

        ...(browser.sidePanel || browser.sidebarAction ? [
            browser.contextMenus.create({
                id: 'execute_side_panel',
                title: browser.i18n.getMessage('openSidePanel'),
                contexts: ['action']
            })
        ] : []),
        
        browser.contextMenus.create({
            id: 'open_app',
            title: browser.i18n.getMessage('openApp'),
            contexts: ['action']
        }),

        browser.contextMenus.create({
            id: 'save_tabs',
            title: browser.i18n.getMessage('saveTabs'),
            contexts: ['action']
        }),

        browser.contextMenus.create({
            id: 'settings',
            title: browser.i18n.getMessage('settings'),
            contexts: ['action']
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