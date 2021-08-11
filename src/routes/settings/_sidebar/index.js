import s from './index.module.styl'
import React from 'react'
import Sidebar, { Content } from '~co/screen/splitview/sidebar'

import Header from './header'
import Pages from './pages'
import App from './app'
import User from './user'

export default function SettingsSidebar(props) {
    return (
        <Sidebar>
            <Header {...props} />

            <Content className={s.content}>
                <User {...props} />
                <br />

                <Pages {...props} />
                <br />
                
                <App {...props} />
            </Content>
        </Sidebar>
    )
}