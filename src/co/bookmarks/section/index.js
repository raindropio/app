import React from 'react'
import t from '~t'
import Icon from '~co/common/icon'

export default function BookmarksSection({ type }) {
    return (
        <article className='element section'>
            <Icon name='sort_score' />
            <div className='sectionName'>&nbsp; {t.s('found')+' '+t.s('in')+' '+t.s('other')+' '+t.s('collectionsCount')}:</div>
        </article>
    )
}