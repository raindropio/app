import React from 'react'
import { humanNumber } from '~modules/strings'

import Icon from '~co/common/icon'
import SuperLink from '~co/common/superLink'

export default class FiltersTagView extends React.Component {
    render() {
        const { _id, count, active, canAppend } = this.props
        const { onClick, onAppendClick, onRenameClick, onContextMenu, onKeyUp } = this.props

        return (
            <article className={`collection menu-item ${active && 'active'} have-actions`}>
                <span className='expand'>
                    <Icon name='arrow_alt' />
                </span>

                <Icon name='tag' className='collectionIcon' />

                <div className='title'>{_id}</div>

                <div className='space' />

                {count ? <div className='count'>{humanNumber(count)}</div> : null}
                <div className='actions'>
                    {canAppend && onAppendClick && <Icon name='add' onClick={onAppendClick} />}
                    <Icon name='more_horizontal' onClick={onContextMenu} />
                </div>

                <SuperLink
                    navPrefix='menu-item'
                    tabIndex={active ? '1' : '-1'}
                    onClick={onClick}
                    onDoubleClick={onRenameClick}
                    onContextMenu={onContextMenu}
                    onKeyUp={onKeyUp}
					className='permalink' />
            </article>
        )
    }
}