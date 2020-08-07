import React from 'react'
import Base from './base'
import Sortable from '../helpers/sortable'

export default class VirtualList extends React.Component {
    static defaultProps = {
        //same as ./base
        //same as ./sortable
    }

    state = {
        sortableDataKey: ''
    }

    onSortableForceRerender = ()=>
        this.setState({sortableDataKey: new Date().getTime()})

    renderListContainer = container=>(
        <Sortable
            {...this.props}
            {...container}
            totalCount={this.props.totalCount+(this.props.footer?1:0)}
            onForceRerender={this.onSortableForceRerender} />
    )

    render() {
        return (
            <Base 
                {...this.props}
                dataKey={this.props.dataKey+this.state.sortableDataKey}
                ListContainer={this.props.sortEnabled ? this.renderListContainer : undefined} />
        )
    }
}