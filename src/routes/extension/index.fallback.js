import React from 'react'
import { Route } from 'react-router-dom'

import Protected from '../_protected'
import Welcome from './welcome'

export default ()=>{
    return (
        <Route element={<Protected redirect />}>
            <Route index element={<Welcome />} />
        </Route>
    )
}