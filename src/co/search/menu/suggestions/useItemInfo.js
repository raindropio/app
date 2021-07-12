import React from 'react'
import _ from 'lodash-es'
import t from '~t'
import { monthDate } from '~modules/format/date'
import { codeToLanguage } from '~modules/format/string'
import CollectionIcon from '~co/collections/item/icon'

const r = /^-?([\w.]+):|(#)/

export default function useItemInfo({ _id, query, count, top, ...other }) {
    const [_q, key, tag] = query.match(r)||[]
    const token = key || tag

    let icon = token
    let title = _id
    let info = top ? query : count

    //special
    switch(token) {
        case 'created':
        case 'before':
        case 'after':
            icon = 'calendar'
            if (top) 
                switch(token){
                    case 'created': title = t.s('byDate'); break
                    case 'before': title = t.s('before'); break
                    case 'after': title = t.s('after'); break
                }    
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

        case 'type':
            if (top){
                title = t.s(token)
                icon = 'document'
            } else {
                icon = _id
                title = t.s(_id)
            }
        break

        case 'important':
            title = t.s('favorites')
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
            title = t.s(token)
        break

        case 'duplicate':
            icon = token
            title = t.s(token+'s')
        break

        case 'collection':
            title = other.title
            info = other.path
            icon = <CollectionIcon _id={_id} cover={other.cover} />
        break

        default:
            title = query
            icon = 'search'
        break
    }

    return { icon, title, info, token }
}