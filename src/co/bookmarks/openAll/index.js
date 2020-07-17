import t from '~t'
import _ from 'lodash'
import getLinks from '~data/modules/bookmarks/getLinks'
import config from '~config'
import { Alert, Confirm } from '~co/overlay/dialog'

export default async function(spaceId, onlySelected, infinite) {
    const links = getLinks(spaceId, onlySelected, infinite)
    links.forEach(link => window.open(link))

    //space is not loaded yet
    if (!links.length)
        await Alert(`${t.s('tryAgain')}! ${_.capitalize(t.s('bookmarks'))} ${t.s('loading').toLowerCase()}…`)

    //help opening multiple tabs
    if (links.length > 1 &&
        localStorage.getItem('open-multiple-links-help') == null){
        if (await Confirm('Having problems?', {
            description: 'Usually browsers prevent opening too many tabs at once. To fix that please read our help page.',
            ok: t.s('help')
        }))
            window.open(config.links.help['open-multiple-links'])
        
        localStorage.setItem('open-multiple-links-help', 1)
    }
}