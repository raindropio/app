import React from 'react'
import t from '~t'
import { humanNumber } from '~modules/strings'

import Icon from '~co/common/icon'
import SuperLink from '~co/common/superLink'

export default class FiltersStatusView extends React.Component {
    render() {
        const { _id, count, to, active } = this.props
        const { onContextMenu } = this.props
        let icon, title

        switch (_id) {
            case 'important':
                icon = 'like'
                title = t.s('favoriteSites')
                break

            case 'notag':
                icon = 'tag'
                title = t.s('noTags')
                break
        
            default:
                icon = _id
                title = t.s(_id)
                break
        }

        return (
            <article className={`collection menu-item ${active && 'active'}`}>
                <span className='expand'>
                    <Icon name='arrow_alt' />
                </span>

                <Icon name={icon} className='collectionIcon' />

                <div className='title'>{title}</div>

                <div className='space' />

                {count ? <div className='count'>{humanNumber(count)}</div> : null}

                <SuperLink
                    to={to}
                    navPrefix='menu-item'
                    tabIndex={active ? '1' : '-1'}
                    onContextMenu={onContextMenu}
					className='permalink' />
            </article>
        )
    }
}