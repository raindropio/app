import React from 'react'
import Base from './base'
import Sortable from './sortable'

export default class VirtualList extends React.Component {
    static defaultProps = {
        //same as ./base
        //same as ./sortable
    }

    render() {
        const Component = this.props.rowIsDraggable && this.props.rowIsDraggable(0) ? Sortable : Base

        return (
            <Component {...this.props} />
        )
    }
}