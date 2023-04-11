import React from 'react'
import _ from 'lodash-es'
import t from '~t'
import { monthDate } from '~modules/format/date'
import { codeToLanguage } from '~modules/format/string'
import { compact } from '~modules/format/number'
import CollectionIcon from '~co/collections/item/icon'

const r = /^-?([\w.]+):|(#|❤️)/

export default function useItemInfo({ _id, query='', count, top, ...other }) {
    const [_q, key, tag] = query.match(r)||[]
    const token = key || tag

    let icon = token
    let title = _id
    let info = compact(count)

    //special
    switch(token) {
        case 'created':
            icon = 'calendar'
            if (top) 
                title = t.s('createdDate')
            else
                title = monthDate(_id)
        break

        case '#':
            icon = 'tag'
            if (top)
                title = _.capitalize(t.s('tag'))
        break

        case 'notag':
            icon = 'tag'
            title = t.s('noTags')
        break

        case 'reminder':
            icon = 'reminder'
            title = t.s('reminders')
        break

        case 'type':
            if (top){
                title = t.s(token)
                icon = 'type'
            } else {
                icon = _id
                title = t.s(_id+'s')
            }
        break

        case '❤️':
        case 'important':
            title = t.s('favorites')
            icon = 'like'
        break

        case 'note':
            title = t.s('notes')
            icon = 'note'
        break

        case 'highlights':
            title = t.s('highlights')
            icon = 'highlights'
        break

        case 'lang':
            icon = 'public'
            if (top)
                title = t.s('language')
            else
                title = _.capitalize(codeToLanguage(_id))+' '+t.s('language').toLowerCase()
        break

        case 'broken':
            icon = token
            title = t.s(token)+' '+t.s('links').toLowerCase()
        break

        case 'duplicate':
            icon = 'duplicates'
            title = t.s(token+'s')
        break

        case 'collection':
            title = other.title
            info = other.path
            icon = <CollectionIcon _id={_id} cover={other.cover} />
        break

        case 'info':
            title = `${_.capitalize(t.s('in'))} ${t.s('title').toLowerCase()}/${t.s('description').toLowerCase()}`
            icon = 'info'
        break

        case 'link':
            title = _.capitalize(t.s('in')) + ' URL'
        break

        case 'match':
            title = t.s('searchMatchAnyCondition')
            icon = 'duplicates'
        break

        default:
            title= `${t.s('defaultCollection-0')} "${query.trim()}"`
            info = '⏎'
        break
    }

    return { icon, title, info, token }
}