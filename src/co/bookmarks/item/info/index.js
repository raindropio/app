import s from './index.module.styl'
import React from 'react'
import t from '~t'

import { ShortDate } from '~modules/format/date'
import SafeHtml from '~co/common/safeHtml'
import { Link } from 'react-router-dom'
import Icon, { Avatar } from '~co/common/icon'
import Path from './path'

export default function BookmarkItemInfo(props) {
    const { className='', creatorRef, domain, type, link, created, reparse, collectionId, spaceId, important, broken, duplicate, cache, highlight, fileType } = props

    return (
        <div className={s.info+' '+className}>
            {creatorRef && creatorRef._id ? (
                <>
                    <section data-inline><Avatar src={creatorRef.avatar} size='micro' /></section>
                    <section>{creatorRef.name}</section>
                </>
            ) : null}

            {spaceId != collectionId && spaceId != collectionId+'s' ? (
                <section><Path {...props} /></section>
            ) : null}

            {important ? (
                <section data-inline className={s.importantLabel}>
                    <Icon name='important_active' size='micro' />
                </section>
            ) : null}

            {broken ? (
                <section><Icon name='broken' size='micro' /></section>
            ) : null}

            {duplicate ? (
                <>
                    <section data-inline className={s.duplicateLabel}><Icon name='duplicate' size='micro' /></section>
                    <section className={s.duplicateLabel}>
                        <Link 
                            to={'/my/0/'+encodeURIComponent(`_id:${duplicate} duplicate:${duplicate} match:OR`)}
                            title={t.s('defaultCollection-0')+' '+t.s('original').toLowerCase()}>
                            {t.s('duplicates')}
                        </Link>
                    </section>
                </>
            ) : null}

            {reparse ? (
                <section data-inline><Icon name='progress' size='micro' /></section>
            ) : null}

            {!fileType && cache && cache != 'ready' && cache != 'retry' ? (
                <section data-inline><Icon name='cache_failed' size='micro' /></section>
            ) : null}

            {type != 'link' ? (
                <section data-inline><Icon name={type} size='micro' /></section>
            ) : null}

            {highlight.link ? (
                <SafeHtml tagName='section' html={highlight.link} />
            ) : (
                <section>{fileType ? t.s('file') : domain}</section>
            )}

            <section><ShortDate date={created}/></section>
        </div>
    )
}