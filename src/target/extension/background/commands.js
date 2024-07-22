import browser from 'webextension-polyfill'
import config from '~config'
import { currentTab } from '~target'
import { open } from './popup'
import { addCurrentTabSelection } from './highlights'

function getSelectedText() {
    var s = window.getSelection(); 
    return s && s.rangeCount>0 && !s.isCollapsed && s.toString().trim().length>0
}

async function onCommand(command, tab) {
    switch(command) {
        case 'save_page':{
            const { url='', id } = tab || await currentTab()

            //save highlight if text is selected
            const [res] = await browser.scripting.executeScript({
                target : {tabId : id},
                func: getSelectedText,
                injectImmediately: true
            })
            if (res?.result)
                return addCurrentTabSelection()

            return open(`/add?link=${encodeURIComponent(url)}`)
        }

        case 'open_raindrop':
            return browser.tabs.create({
                url: config.links.app.index,
                active: true
            })

        case 'execute_side_panel': {
            const { windowId } = tab
            return browser.sidePanel.open({ windowId })
        }
    }
}

export default function (){
    browser.commands.onCommand.removeListener(onCommand)
    browser.commands.onCommand.addListener(onCommand)
}