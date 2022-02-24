import browser from 'webextension-polyfill'
import config from '~config'
import { currentTab } from '~target'
import { open } from './portal'
import { addCurrentTabSelection } from './highlights'

async function onCommand(command) {
    switch(command) {
        case 'save_page':{
            const { url='' } = await currentTab()
            return open(`/add?link=${encodeURIComponent(url)}`)
        }

        case 'open_raindrop':{
            return browser.tabs.create({
                url: config.links.app.index,
                active: true
            })
        }

        case 'save_highlight':
            return addCurrentTabSelection()
    }
}

export default function (){
    browser.commands.onCommand.removeListener(onCommand)
    browser.commands.onCommand.addListener(onCommand)
}