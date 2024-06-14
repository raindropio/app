import React from 'react'
import { Outlet } from 'react-router-dom'
import SplitView from '~co/screen/splitview'

import Sidebar from './sidebar'
import OnboardUpgrade from './onboard-upgrade'

export default function PageMyLayout() {
    return (
        <SplitView>
            <Sidebar />
            <Outlet />
            <OnboardUpgrade />
        </SplitView>
    )
}