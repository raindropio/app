import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Layout from './layout'
import Item from './item'
import Space from './space'

export default function PageMy() {
    const nested = (<>
        <Route path='item/:itemId/*' element={<Item />} />
    </>)

    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path=':cId'>
                    <Route path='' element={<Space />}>{nested}</Route>
                    <Route path='full' element={<Space />}>{nested}</Route>
                    <Route path=':search' element={<Space />}>{nested}</Route>
                    <Route path=':search/:fromCid' element={<Space />}>{nested}</Route>
                </Route>
            </Route>
        </Routes>
    )
}