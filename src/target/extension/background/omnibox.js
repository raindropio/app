import browser from 'webextension-polyfill'
import config from '~config'
import Api from '~data/modules/api'
import _ from 'lodash'

function emToMatch(str='') {
    if (!str)
        return ''

    if (process.env.EXTENSION_VENDOR == 'firefox')
        return str.replaceAll(/<[^>]*>/g, '')

    return _.escape(str)
        .replaceAll(_.escape('<em>'), '<match>')
        .replaceAll(_.escape('</em>'), '</match>')
}

async function onInputChanged(text, addSuggestions) {
    const query = { key: 'word', val: text }

    const { items=[] } = await Api._get(`raindrops/0?search=${encodeURIComponent(JSON.stringify([query]))}&perpage=10&sort=score`)

    addSuggestions(
        items.map(({ link, title, highlight={} })=>({
            content: link,
            description: 
                emToMatch(highlight.title||title) +
                (process.env.EXTENSION_VENDOR != 'firefox' ? ` - <url>${_.escape(link)}</url>` : '')
        }))
    )
}

function onInputEntered(text, disposition) {
    let url = text

    if (!text)
        url = config.links.app.index
    else if (!/.*:\/\//g.test(text))
        url = `${config.links.app.search}${encodeURIComponent(text)}`

    switch (disposition) {
        case 'currentTab':
            return browser.tabs.update({url})

        case 'newForegroundTab':
            return browser.tabs.create({url})

        case 'newBackgroundTab':
            return browser.tabs.create({url, active: false})
    }
}

export default function() {
    if (!browser.omnibox)
        return

    browser.omnibox.setDefaultSuggestion({
        description: 'Search'
    })

    browser.omnibox.onInputChanged.removeListener(onInputChanged)
    browser.omnibox.onInputChanged.addListener(onInputChanged)
    browser.omnibox.onInputEntered.removeListener(onInputEntered)
    browser.omnibox.onInputEntered.addListener(onInputEntered)
}