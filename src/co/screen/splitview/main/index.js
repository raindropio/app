import React from 'react'
import { Context } from '../'

import Header from './header'
import Content from './content'
import Footer from './footer'

export default class SplitViewMain extends React.Component {
    static contextType = Context
    
    render() {
        const { children, ...other } = this.props

        return (
            <aside id='main' {...other}>
                {children}
            </aside>
        )
    }
}

export {
    Header,
    Content,
    Footer,
}