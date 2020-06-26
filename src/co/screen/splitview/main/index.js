import './index.module.styl'
import React from 'react'
import { Context } from '../'
import Small from '../helpers/small'

import Header from './header'
import Content from './content'
import Footer from './footer'

export default class SplitViewMain extends React.Component {
    static contextType = Context

    ref = React.createRef()
    
    render() {
        const { children, ...other } = this.props

        return (
            <Small 
                ref={this.ref}
                className='svMain'
                minWidth={500}
                {...other}>
                {children}
            </Small>
        )
    }
}

export {
    Header,
    Content,
    Footer,
}