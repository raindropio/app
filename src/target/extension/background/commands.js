import browser from 'webextension-polyfill'
import config from '~config'
import { currentTab } from '~target'
import { openAdd } from './utils'

async function onCommand(command) {
    switch(command) {
        case 'save_page':{
            const { url='' } = await currentTab()
            return openAdd({ link: url })
        }

        case 'open_raindrop':{
            return browser.tabs.create({
                url: config.links.app.index,
                active: true
            })
        }
    }
}

export default function (){
    browser.commands.onCommand.removeListener(onCommand)
    browser.commands.onCommand.addListener(onCommand)
}