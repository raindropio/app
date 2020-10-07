import s from './view.module.styl'
import React from 'react'
import t from '~t'

import DragItem from '~co/bookmarks/dnd/drag/item'
import SuperLink from '~co/common/superLink'
import SafeHtml from '~co/common/safeHtml'
import Cover from './cover'
import Tags from './tags'
import Info from './info'
import Actions from './actions'

export default class BookmarkItemView extends React.Component {
    getLinkProps = ()=>{
        const { getLink, mainAction, _id, link } = this.props

        switch (mainAction) {
            case 'current_tab':
                return {
                    href: link
                }

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

    render() {
        const { innerRef, isDragging } = this.props
        const { _id, link, title, excerpt, highlight, cover, domain, tags, view, access } = this.props
        const { active, selected, selectModeEnabled, selectDisabled, important, broken, gridSize } = this.props
        const { getLink, onClick, onDoubleClick, onMouseDown, onSelectClick, onContextMenu, onKeyUp } = this.props

        return (
            <DragItem 
                {...this.props}
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

                    <Actions 
                        {...this.props}
                        className={s.actions} />

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
                        onMouseDown={onMouseDown}
                        onKeyUp={onKeyUp} />
                </article>
            )}</DragItem>
        )
    }
}