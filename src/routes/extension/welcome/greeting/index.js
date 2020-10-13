import s from './index.module.styl'
import React from 'react'

import Header from './header'
import IsUpdate from './is_update'
import Settings from '~routes/settings/extension'
import Footer from './footer'

export default function ExtensionWelcome(props) {
    return (
        <>
            <Header {...props} />
            <IsUpdate {...props} />
            
            <div className={s.settings}>
                <Settings />
            </div>

            <Footer {...props} />
        </>
    )
}