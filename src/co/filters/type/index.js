import React from 'react'
import t from '~t'
import { humanNumber } from '~modules/strings'

import Icon from '~co/common/icon'
import SuperLink from '~co/common/superLink'

export default class FiltersType extends React.Component {
    render() {
        const { name, count, to, active } = this.props
        let icon, title

        switch (name) {
            case 'important':
                icon = 'like'
                title = t.s('favoriteSites')
                break
        
            default:
                icon = name
                title = t.s(name)
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
					className='permalink' />
            </article>
        )
    }
}