import browser from 'webextension-polyfill'
import config from '~config'
import { currentTab } from '~target'
import { open } from './popup'
import { addCurrentTabSelection } from './highlights'
import Api from '~data/modules/api'

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

            let openAction = false
            try {
                const {user:{config}} = (await Api._get('user'))
                openAction = config.browser_extension_mode == 'clipper' && config.add_auto_save == true
            }
            catch(e) { console.error(e) }

            if (openAction)
                return browser.action.openPopup()

            return open(`/add?link=${encodeURIComponent(url)}`)
        }

        case 'open_raindrop_web':
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