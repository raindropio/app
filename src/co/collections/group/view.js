import React from 'react'
import Icon from '~co/common/icon'

export default class CollectionsGroupView extends React.Component {
    render() {
        const { title, hidden, system, selected } = this.props
        const { isDragging, isDropping } = this.props
        const { onClick, onContextMenu } = this.props

        if (system) return null

        return (
            <div 
                className={`group ${selected && 'active'} ${isDragging && 'is-dragging'} ${isDropping && 'is-drag-over'}`}
                onContextMenu={onContextMenu}>
                <div className='title' onClick={onClick}>{title}</div>
                <div className='toggle'><Icon name='more_horizontal' onMouseDown={onContextMenu} /></div>
            </div>
        )
    }
}