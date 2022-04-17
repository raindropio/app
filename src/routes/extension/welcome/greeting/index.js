import s from './index.module.styl'
import React from 'react'

import Header from './header'
import Settings from '~routes/settings/extension'
import Footer from './footer'

export default function ExtensionWelcome(props) {
    return (
        <>
            <Header {...props} />
            
            <div className={s.settings}>
                <Settings hideHeader />
            </div>

            <Footer {...props} />
        </>
    )
}