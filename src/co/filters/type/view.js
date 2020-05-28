import React from 'react'
import t from '~t'
import { humanNumber } from '~modules/strings'

import Icon from '~co/common/icon'
import SuperLink from '~co/common/superLink'

export default class FiltersType extends React.Component {
    render() {
        const { _id, count, active, canAppend } = this.props
        const { onClick, onContextMenu, onAppendClick } = this.props

        let title = ''
        switch (_id) {
            case 'article':
                title = t.s('readItLater')
                break;
        
            default:
                title = t.s(_id)
                break;
        }

        const showActions = canAppend && onAppendClick

        return (
            <article className={`collection menu-item ${active && 'active'} ${showActions && 'have-actions'}`}>
                <span className='expand'>
                    <Icon name='arrow_alt' />
                </span>

                <Icon name={_id} className='collectionIcon' />

                <div className='title'>{title}</div>

                <div className='space' />

                {count ? <div className='count'>{humanNumber(count)}</div> : null}

                {showActions ? (
                    <div className='actions'>
                        <Icon name='add' onClick={onAppendClick} />
                    </div>
                ) : null}

                <SuperLink
                    navPrefix='menu-item'
                    tabIndex={active ? '1' : '-1'}
                    onClick={onClick}
                    onContextMenu={onContextMenu}
					className='permalink' />
            </article>
        )
    }
}