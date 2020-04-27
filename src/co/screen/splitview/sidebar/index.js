import React from 'react'
import { Context } from '../'

import Header from './header'
import Content from './content'
import Footer from './footer'

export default class SplitViewSidebar extends React.Component {
    static contextType = Context

    render() {
        return (
            <>
                <aside id='sidebar'>
                    {this.props.children}
                </aside>

                <div id='sidebar-black-overlay' onClick={this.context.sidebar.toggle} />
            </>
        )
    }
}

export {
    Header,
    Content,
    Footer,
}