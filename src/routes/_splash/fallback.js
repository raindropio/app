import React from 'react'
import t from '~t'
import { Helmet } from 'react-helmet'
import SplitView from '~co/screen/splitview'
import * as Sidebar from '~co/screen/splitview/sidebar'
import Main from '~co/screen/splitview/main'
import { FirstAction } from '~co/common/header'
import Button from '~co/common/button'
import { Avatar } from '~co/common/icon'

export default function SplashApp() {
    return (
        <SplitView>
            <Helmet><title>{t.s('loading')}…</title></Helmet>

            <Sidebar.default>
                <Sidebar.Header data-no-shadow>
                    <FirstAction>
                        <Button disabled><Avatar /></Button>
                    </FirstAction>
                </Sidebar.Header>
            </Sidebar.default>
            <Main />
        </SplitView>
    )
}