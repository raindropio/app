import './index.module.styl'
import React from 'react'
import { Context } from '../'

import Header from './header'
import Content from './content'
import Footer from './footer'
import Resize from './resize'

export default class SplitViewSidebar extends React.Component {
    static contextType = Context

    render() {
        return (
            <>
                <aside className='svSidebar'>
                    {this.props.children}
                </aside>

                <div className='svSidebarBackdrop' onClick={this.context.sidebar.toggle} />

                <Resize />
            </>
        )
    }
}

export {
    Header,
    Content,
    Footer,
}