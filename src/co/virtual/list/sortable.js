import React from 'react'
import Base from './base'
import Sortable from '../helpers/sortable'

export default class VirtuosoListWithDnd extends React.Component {
    static defaultProps = {
        //...same as ./base
        //...same as ../helpers/sortable
    }

    state = {
        innerDataKey: ''
    }

    onForceRerender = ()=>
        this.setState({innerDataKey: new Date().getTime()})

    renderListContainer = container=>(
        <Sortable
            {...this.props}
            {...container}
            totalCount={this.props.totalCount+(this.props.footer?1:0)}
            onForceRerender={this.onForceRerender} />
    )
    
    render() {
        return (
            <Base
                {...this.props}
                dataKey={this.props.dataKey+this.state.innerDataKey}
                ListContainer={this.renderListContainer} />
        )
    }
}