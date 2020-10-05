import browser from 'webextension-polyfill'
import config from '~config'
import { openAdd } from './utils'

async function onCommand(command) {
    switch(command) {
        case 'save_page':{
            const [ { url='', title='' } ] = await browser.tabs.query({ active: true, currentWindow: true })
            return openAdd({ link: url, title })
        }

        case 'open_raindrop':{
            return browser.tabs.create({
                url: config.links.app.index,
                active: true
            })
        }
    }
}

export default async function (){
    browser.commands.onCommand.removeListener(onCommand)
    browser.commands.onCommand.addListener(onCommand)
}