import React from 'react'
import { humanNumber } from '~modules/strings'

import Icon from '~co/common/icon'
import SuperLink from '~co/common/superLink'

export default class FiltersTagView extends React.Component {
    render() {
        const { name, count, to, active } = this.props
        const { onRenameClick, onContextMenu, onKeyUp } = this.props

        return (
            <article className={`collection menu-item ${active && 'active'} have-actions`}>
                <span className='expand'>
                    <Icon name='arrow_alt' />
                </span>

                <div className='title'>{name}</div>

                <div className='space' />

                {count ? <div className='count'>{humanNumber(count)}</div> : null}
                <div className='actions'><Icon name='more_horizontal' onClick={onContextMenu} /></div>

                <SuperLink
                    to={to}
                    navPrefix='menu-item'
                    tabIndex={active ? '1' : '-1'}
                    onDoubleClick={onRenameClick}
                    onContextMenu={onContextMenu}
                    onKeyUp={onKeyUp}
					className='permalink' />
            </article>
        )
    }
}