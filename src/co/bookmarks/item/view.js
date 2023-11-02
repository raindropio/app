import s from './view.module.styl'
import React from 'react'
import t from '~t'

import DragItem from '~co/bookmarks/dnd/drag/item'
import SuperLink from '~co/common/superLink'
import SafeHtml from '~co/common/safeHtml'
import SafeMarkdown from '~co/common/safeMarkdown'
import Cover from './cover'
import Tags from './tags'
import Highlights from './highlights'
import Reminder from './reminder'
import Info from './info'
import Actions from './actions'

export default function BookmarkItemView(props) {
    const { innerRef, isDragging } = props
    const { _id, link, title, excerpt, highlight, cover, domain, tags, note, highlights, reminder, view, access, spaceId } = props
    const { active, selected, selectModeEnabled, selectDisabled, important, broken, coverSize } = props
    const { onClick, onDoubleClick, onSelectClick, onContextMenu, onKeyUp } = props

    return (
        <DragItem 
            {...props}
            ghostClassName={s.dragGhost}>{drag=>(
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
                {...drag}>
                <Cover
                    cover={cover}
                    domain={domain}
                    link={link}
                    view={view}
                    coverSize={coverSize} />

                <div className={s.about}>
                    {/* Text */}
                    <SafeHtml className={s.title} html={highlight.title || title} />
                    
                    <div className={s.description}>
                        {note ? (
                            <SafeMarkdown className={s.note} markdown={note} />
                        ) : null}
                        {excerpt ? (
                            <SafeHtml className={s.excerpt} html={highlight.excerpt || excerpt} />
                        ) : null}
                        <Reminder reminder={reminder} />
                        <Highlights className={s.highlights} highlights={highlights} />
                        <Tags tags={tags} spaceId={spaceId} />
                    </div>

                    {/* Info */}
                    <Info 
                        {...props}
                        className={s.info} />
                </div>

                <Actions 
                    {...props}
                    className={s.actions} />

                {access && access.level >= 3 ? (
                    <label
                        className={`${s.select} ${selected ? s.active : s.default}`}
                        title={t.s('select')}>
                        <input type='checkbox' readOnly checked={selected} disabled={selectDisabled} onClick={onSelectClick} />
                    </label>
                ) : null}

                <SuperLink
                    href={link}
                    rel='noopener'

                    className={s.permalink}

                    active={active}
                    tabIndex='0'

                    onClick={onClick}
                    onDoubleClick={onDoubleClick}
                    onContextMenu={onContextMenu}
                    onKeyUp={onKeyUp}>
                    {title}
                </SuperLink>
            </article>
        )}</DragItem>
    )
}