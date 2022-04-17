import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { target } from '~target'

import Layout from './layout'
import Redirect from './redirect'
import Electron from './electron'
import Extension from './extension'
import JWT from './jwt'
import Login from './login'
import Lost from './lost'
import Recover from './recover'
import Signup from './signup'

export default function PageAccount() {
    let index
    switch(target) {
        case 'extension':   index = 'extension'; break
        case 'electron':    index = 'electron'; break
        default:            index = 'login'; break
    }
    
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route element={<Redirect />}>
                    <Route index element={<Navigate replace to={index} />} />

                    <Route path='electron' element={<Electron />} />
                    <Route path='extension' element={<Extension />} />
                    <Route path='jwt' element={<JWT />} />
                    <Route path='login' element={<Login />} />
                    <Route path='signup' element={<Signup />} />
                </Route>

                <Route path='lost' element={<Lost />} />
                <Route path='recover/:token' element={<Recover />} />
            </Route>
        </Routes>
    )
}