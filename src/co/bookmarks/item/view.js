import s from './view.module.styl'
import React from 'react'
import { Link } from 'react-router-dom'
import t from '~t'

import SuperLink from '~co/common/superLink'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import SafeHtml from '~co/common/safeHtml'
import Cover from './cover'
import Tags from './tags'
import Info from './info'

export default class BookmarkItemView extends React.PureComponent {
    onDragStart = e=>{
        const { _id, link, selectModeEnabled } = this.props
        if (selectModeEnabled) return

        e.dataTransfer.setData('text/uri-list', link)
        e.dataTransfer.setData('text/plain', link)
        e.dataTransfer.setData('bookmark', _id)
        
        //preview
        const dragPreview = e.currentTarget.cloneNode(true)
        dragPreview.classList.add(s.dragGhost)
        dragPreview.id='dragPreview'

        document.body.appendChild(dragPreview)
        e.dataTransfer.setDragImage(dragPreview, dragPreview.offsetWidth/6, dragPreview.offsetHeight/6)
    }

    onDragEnd = ()=>{
        const dragPreview = document.getElementById('dragPreview')
        if (dragPreview) dragPreview.remove()
    }

    getLinkProps = ()=>{
        const { getLink, mainAction, _id, link } = this.props

        switch (mainAction) {
            case 'new_tab':
                return {
                    href: link,
                    target: '_blank'
                }
        
            default:
                return {
                    to: getLink({
                        bookmark: _id,
                        tab: mainAction
                    })
                }
        }
    }

    renderSecondaryAction = ()=>{
        const { getLink, mainAction, _id, link } = this.props

        switch(mainAction) {
            case 'new_tab':
                return (
                    <Button 
                        as={Link}
                        to={getLink({ bookmark: _id, tab: '' })}
                        variant='outline'
                        title={t.s('preview')}>
                        <Icon name='show' />
                    </Button>
                )

            default:
                return (
                    <Button 
                        href={link}
                        target='_blank'
                        variant='outline'
                        title={t.s('open')+' '+t.s('inNewTab')}>
                        <Icon name='open' />
                    </Button>
                )
        }
    }

    render() {
        const { innerRef, isDragging, mainAction } = this.props
        const { _id, link, title, excerpt, highlight, cover, domain, tags, view, access } = this.props
        const { active, selected, selectModeEnabled, selectDisabled, important, broken, gridSize } = this.props
        const { getLink, onClick, onDoubleClick, onSelectClick, onRemoveClick, onContextMenu, onKeyUp } = this.props

        return (
            <article 
                ref={innerRef}
                role='listitem'
                className={`
                    ${s.element}
                    ${active&&s.active}
                    ${selected&&s.checked}
                    ${important&&s.important}
                    ${broken&&s.broken}
                    ${isDragging&&s.isDragging}
                    ${s[view]}
                    ${selectModeEnabled&&s.selectModeEnabled}
                `}
                data-id={_id}
                draggable
                onDragStart={this.onDragStart}
                onDragEnd={this.onDragEnd}>
                <Cover
                    cover={cover}
                    domain={domain}
                    link={link}
                    view={view}
                    gridSize={gridSize} />

                <div className={s.about}>
                    {/* Text */}
                    <SafeHtml className={s.title}>{highlight.title || title}</SafeHtml>
                    
                    <div className={s.description}>
                        {excerpt ? <SafeHtml className={s.excerpt}>{highlight.excerpt || excerpt}</SafeHtml> : null}
                        {highlight.body ? <SafeHtml className={s.body}>{highlight.body}</SafeHtml> : null}
                        <Tags tags={tags} getLink={getLink} />
                    </div>

                    {/* Info */}
                    <Info 
                        {...this.props}
                        className={s.info} />
                </div>

                <div className={s.actions}>
                    {this.renderSecondaryAction()}

                    {access.level >= 3 ? (
                        <>
                            <Button 
                                as={Link}
                                to={getLink({ bookmark: _id, tab: 'edit', autoFocus: 'tags' })}
                                variant='outline'>
                                <Icon name='tag' />
                            </Button>

                            {mainAction != 'edit' && (
                                <Button 
                                    as={Link}
                                    to={getLink({ bookmark: _id, tab: 'edit', autoFocus: '' })}
                                    variant='outline'>
                                    {t.s('editMin')}
                                </Button>
                            )}

                            <Button 
                                variant='outline'
                                title={t.s('remove')}
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
                    {...this.getLinkProps()}
                    className={s.permalink}

                    active={active}
                    tabIndex='0'

                    onClick={onClick}
                    onDoubleClick={onDoubleClick}
                    onContextMenu={onContextMenu}
                    onKeyUp={onKeyUp} />
            </article>
        )
    }
}