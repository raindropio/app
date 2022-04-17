import s from './layout.module.styl'
import React from 'react'
import t from '~t'
import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import SplitView from '~co/screen/splitview'
import Main from '~co/screen/splitview/main'
import Sidebar from './sidebar'

export default function PageSettingsLayout() {
    const hideFrame = navigator.userAgent.includes('RaindropMobile')

    return (
        <SplitView>
            <Helmet><title>{t.s('settings')}</title></Helmet>

            {!hideFrame && (<Sidebar />)}

            <Main className={s.main}>
                <div className={s.content}>
                    <Outlet />
                </div>
            </Main>
        </SplitView>
    )
}