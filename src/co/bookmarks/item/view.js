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
    render() {
        const { innerRef, isDragging } = this.props
        const { _id, link, title, excerpt, highlight, cover, domain, tags, view, access } = this.props
        const { active, selected, selectModeEnabled, selectDisabled, important, broken, gridSize } = this.props
        const { getLink, onClick, onSelectClick, onRemoveClick, onContextMenu, onKeyUp } = this.props

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
                    <Button 
                        as={Link}
                        to={getLink({ bookmark: _id }, true)}
                        variant='outline'
                        title={t.s('preview')}>
                        <Icon name='show' />
                    </Button>

                    {access.level >= 3 ? (
                        <>
                            <Button 
                                as={Link}
                                to={getLink({ bookmark: _id, tab: 'edit', autoFocus: 'tags' }, true)}
                                variant='outline'>
                                <Icon name='tag' />
                            </Button>

                            <Button 
                                as={Link}
                                to={getLink({ bookmark: _id, tab: 'edit' }, true)}
                                variant='outline'>
                                {t.s('editMin')}
                            </Button>

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
                    className={s.permalink}
                    href={link}

                    active={active}
                    tabIndex='0'

					onClick={onClick}
                    onContextMenu={onContextMenu}
                    onKeyUp={onKeyUp} />
            </article>
        )
    }
}