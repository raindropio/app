import React from 'react'
import { withSplitView } from '../'

import Header from './header'
import Content from './content'
import Footer from './footer'

export default withSplitView(
    class SplitViewMain extends React.Component {
        render() {
            const { children, ...other } = this.props

            return (
                <aside id='main' {...other}>
                    {children}
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