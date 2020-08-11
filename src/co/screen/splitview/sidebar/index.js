import './index.module.styl'
import React from 'react'

import Header from './header'
import Content from './content'
import Footer from './footer'
import Resize from './resize'
import Backdrop from './backdrop'

export default class SplitViewSidebar extends React.Component {
    render() {
        return (
            <>
                <aside className='svSidebar'>
                    {this.props.children}
                    <Resize />
                </aside>

                <Backdrop />
            </>
        )
    }
}

export {
    Header,
    Content,
    Footer,
}