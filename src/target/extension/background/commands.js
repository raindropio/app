import browser from 'webextension-polyfill'
import { openAdd } from './utils'

async function onCommand(command) {
    switch(command) {
        case 'save_page':{
            const [ { url='', title='' } ] = await browser.tabs.query({ active: true, currentWindow: true })
            return openAdd({ link: url, title })
        }
    }
}

export default async function (){
    browser.commands.onCommand.removeListener(onCommand)
    browser.commands.onCommand.addListener(onCommand)
}