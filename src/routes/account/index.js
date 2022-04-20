import React from 'react'
import { Route, Navigate } from 'react-router-dom'
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
    return (
        <Route element={<Layout />}>
            <Route element={<Redirect />}>
                {(()=>{switch(target) {
                    case 'electron':
                        return <Route path='*' element={<Electron />} />

                    case 'extension':
                        return <Route path='*' element={<Extension />} />
                        
                    default:
                        return (<>
                            <Route index element={<Navigate replace to='login' />} />
                            <Route path='login' element={<Login />} />
                            <Route path='signup' element={<Signup />} />
                        </>)
                }})()}

                <Route path='jwt' element={<JWT />} />
                <Route path='recover/:token' element={<Recover />} />
            </Route>

            <Route path='lost' element={<Lost />} />
        </Route>
    )
}