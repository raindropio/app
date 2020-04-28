import React from 'react'
import t from '~t'

export default class CollectionsGroupView extends React.Component {
    render() {
        const { title, hidden, selected, onClick, onContextMenu } = this.props

        return (
            <div 
                className={`group ${selected && 'active'}`}
                onContextMenu={onContextMenu}
                onClick={onClick}>
                <div className='title'>{title}</div>
                <span className='toggle'>{t.s(hidden ? 'show' : 'hide')}</span>
            </div>
        )
    }
}