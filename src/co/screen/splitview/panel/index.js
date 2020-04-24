import React from 'react'
import { withSplitView } from '../'

import Header from './header'
import Content from './content'
import Footer from './footer'

export default withSplitView(
    class SplitViewPanel extends React.Component {
        render() {
            return (
                <aside id='panel'>
                    {this.props.children}
                </aside>
            )
        }
    }
)

export {
    Header,
    Content,
    Footer,
}