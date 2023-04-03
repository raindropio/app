import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { target } from '~target'

import Layout from './layout'
import Account from './account'
import App from './app'
import Backups from './backups'
import Extension from './extension'
import Import from './import'
import Integrations from './integrations'
import Pro from './pro'
import Tfa from './tfa'

export default function PageSettings() {
    return (
        <Route element={<Layout />}>
            <Route index element={<Navigate replace to={target=='extension'?'extension':'app'} />} />
            <Route path='account' element={<Account />} />
            <Route path='app' element={<App />} />
            <Route path='backups' element={<Backups />} />
            <Route path='extension' element={<Extension />} />
            <Route path='import' element={<Import />} />
            <Route path='integrations' element={<Integrations />} />
            <Route path='pro' element={<Pro />} />
            <Route path='tfa' element={<Tfa />} />
        </Route>
    )
}