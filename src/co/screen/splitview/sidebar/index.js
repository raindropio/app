import React from 'react'
import { withSplitView } from '../'

import Header from './header'
import Content from './content'
import Footer from './footer'

export default withSplitView(
    class SplitViewSidebar extends React.Component {
        render() {
            return (
                <>
                    <aside id='sidebar'>
                        {this.props.children}
                    </aside>

                    <div id='sidebar-black-overlay' onClick={this.props.sidebar.toggle} />
                </>
            )
        }
    }
)

export {
    Header,
    Content,
    Footer,
}