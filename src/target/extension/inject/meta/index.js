import browser from 'webextension-polyfill'
import parse from './parse'

function onMessage({ type, ...params }, sender, callback) {
    switch(type) {
        case 'GET_META':
            return callback(parse(params))
    }
}

export default async function() {
    browser.runtime.onMessage.removeListener(onMessage)
    browser.runtime.onMessage.addListener(onMessage)
}