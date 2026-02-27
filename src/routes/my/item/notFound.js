import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function PageMyItemExists({ item, isLoading }) {
    if (!item._id)
        return isLoading ? null : <Navigate to='../' replace />

    return <Outlet />
}