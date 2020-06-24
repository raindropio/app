import s from './view.module.styl'
import React from 'react'
import t from '~t'
import { ShortDate } from '~modules/format/date'

import SuperLink from '~co/common/superLink'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import SafeHtml from '~co/common/safeHtml'
import Cover from './cover'
import Tags from './tags'
import Path from './path'

export default class BookmarkItemView extends React.PureComponent {
    render() {
        const { innerRef, isDragging } = this.props
        const { link, title, excerpt, highlight, cover, domain, tags, type, view, access, created, reparse, collectionId, spaceId } = this.props
        const { active, selected, selectModeEnabled, selectDisabled, important, broken, gridSize } = this.props
        const { onClick, onTagClick, onEditClick, onPreviewClick, onSelectClick, onRemoveClick, onContextMenu, onKeyUp } = this.props

        return (
            <article 
                ref={innerRef}
                className={`
                    ${s.element}
                    ${active&&s.active}
                    ${selected&&s.checked}
                    ${important&&s.important}
                    ${broken&&s.broken}
                    ${isDragging&&s.isDragging}
                    ${s[view]}
                    ${selectModeEnabled&&s.selectModeEnabled}
                `}>
                <Cover
                    cover={cover}
                    link={link}
                    view={view}
                    gridSize={gridSize} />

                <div className={s.about}>
                    {/* Text */}
                    <SafeHtml className={s.title}>{highlight.title || title}</SafeHtml>
                    
                    <div className={s.description}>
                        <SafeHtml className={s.excerpt}>{highlight.excerpt || excerpt}</SafeHtml>
                        {highlight.body ? <SafeHtml className={s.body}>{highlight.body}</SafeHtml> : null}
                        <Tags tags={tags} onTagClick={onTagClick} />
                    </div>

                    {/* Info */}
                    <div className={s.info}>
                        {spaceId != collectionId ? <section><Path collectionId={collectionId} /></section> : null}

                        {important ? <section data-inline><Icon name='important' data-size='micro' className={s.importantIcon} /></section> : null}

                        {reparse ? <section data-inline><Icon name='progress' data-size='micro' /></section> : null}

                        {type != 'link' ? <section data-inline><Icon name={type} data-size='micro' /></section> : null}

                        <section>{domain}</section>

                        <section><ShortDate date={created}/></section>
                    </div>
                </div>

                <div className={s.actions}>
                    <Button 
                        variant='outline'
                        onClick={onPreviewClick}
                        tabIndex='-1'
                        title={t.s('preview')}>
                        <Icon name='show' />
                    </Button>

                    {access.level >= 3 ? (
                        <>
                            <Button 
                                variant='outline'
                                onClick={onEditClick}>
                                {t.s('editMin')}
                            </Button>

                            <Button 
                                variant='outline'
                                onClick={onRemoveClick}>
                                <Icon name='trash' />
                            </Button>
                        </>
                    ) : null}
                </div>

                {access.level >= 3 ? (
                    <label
                        className={`${s.select} ${selected ? s.active : s.default}`}
                        title={t.s('select')}>
                        <input type='checkbox' checked={selected} disabled={selectDisabled} onChange={onSelectClick} />
                    </label>
                ) : null}

                <SuperLink
					navPrefix='element'
                    href={link}
                    tabIndex={active ? '200' : '-1'}
					onClick={onClick}
                    onContextMenu={onContextMenu}
                    onKeyUp={onKeyUp} />
            </article>
        )
    }
}