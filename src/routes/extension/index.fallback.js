import React from 'react'
import { Route } from 'react-router-dom'
import Welcome from './welcome'

export default ()=>{
    return (
        <Route index element={<Welcome />} />
    )
}