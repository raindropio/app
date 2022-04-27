import browser from 'webextension-polyfill'
import config from '~config'
import { currentTab } from '~target'
import { open } from './popup'
import { addCurrentTabSelection } from './highlights'

async function onCommand(command) {
    switch(command) {
        case 'save_page':{
            const { url='', id } = await currentTab()

            //save highlight if text is selected
            const [textSelected] = await browser.tabs.executeScript(id, {
                code: 'var s = window.getSelection(); s && s.rangeCount>0 && !s.isCollapsed && s.toString().trim().length>0'
            })
            if (textSelected)
                return addCurrentTabSelection()

            return open(`/add?link=${encodeURIComponent(url)}`)
        }

        case 'open_raindrop':
            return browser.tabs.create({
                url: config.links.app.index,
                active: true
            })
    }
}

export default function (){
    browser.commands.onCommand.removeListener(onCommand)
    browser.commands.onCommand.addListener(onCommand)
}