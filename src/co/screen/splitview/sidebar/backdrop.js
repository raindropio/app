import React from 'react'
import { Context } from '../'

export default class SplitViewSidebarBackdrop extends React.Component {
    static contextType = Context

    render() {
        return (
            <div 
                className='svSidebarBackdrop'
                onClick={this.context.sidebar.toggle} />
        )
    }
}