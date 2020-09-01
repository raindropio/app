import './index.module.styl'
import React from 'react'
import { connect } from 'react-redux'

import Header from './header'
import Content from './content'
import Footer from './footer'
import Resize from './resize'
import Backdrop from './backdrop'

function SplitViewSidebar({ theme, children }) {
    return (
        <>
            <aside 
                className='svSidebar'
                data-theme={theme.sidebar}>
                {children}
                <Resize />
            </aside>

            <Backdrop />
        </>
    )
}

export default connect(
    (state)=>({
        theme: state.local.theme,
    })
)(SplitViewSidebar)

export {
    Header,
    Content,
    Footer,
}