import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function PageMyItemExists({ item }) {
    if (!item._id)
        return <Navigate to='../../' replace />

    return <Outlet />
}