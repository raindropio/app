import s from './index.module.styl'
import React from 'react'
import t from '~t'
import Icon from '~co/common/icon'

export default function BookmarksSection({ type, view }) {
    return (
        <article className={s.section+' '+view}>
            <Icon name='sort_score' />
            <div>&nbsp; {t.s('found')+' '+t.s('in')+' '+t.s('other')+' '+t.s('collectionsCount')}:</div>
        </article>
    )
}