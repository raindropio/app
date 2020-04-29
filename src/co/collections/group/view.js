import React from 'react'
import t from '~t'

export default class CollectionsGroupView extends React.Component {
    render() {
        const { title, hidden, system, selected } = this.props
        const { isDragging, isDropping } = this.props
        const { onClick, onContextMenu } = this.props

        if (system) return null

        return (
            <div 
                className={`group ${selected && 'active'} ${isDragging && 'is-dragging'} ${isDropping && 'is-drag-over'}`}
                onContextMenu={onContextMenu}
                onClick={onClick}>
                <div className='title'>{title}</div>
                <span className='toggle'>{t.s(hidden ? 'show' : 'hide')}</span>
            </div>
        )
    }
}