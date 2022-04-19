import React from 'react'
import { target } from '~target'
import { HashRouter, BrowserRouter, Routes, Route } from 'react-router-dom'

import Protected from './_protected'
import NotFound from './notFound'

import Default from './default'
import Account from './account'
import Add from './add'
import Extension from './extension'
import My from './my'
import Settings from './settings'

const Router = target == 'web' ? BrowserRouter : HashRouter

export default function Pages() {
    return (
        <Router>
            <Routes>
                <Route index element={<Default />} />

                <Route path='account'>{Account()}</Route>
                <Route path='extension'>{Extension()}</Route>

                <Route element={<Protected redirect />}>
                    <Route path='add' element={<Add />} />
                    <Route path='my'>{My()}</Route>
                    <Route path='settings'>{Settings()}</Route>
                </Route>

                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    )
}