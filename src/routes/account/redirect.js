import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userStatus } from '~data/selectors/user'
import { refresh } from '~data/actions/user'
import isURL from 'validator/es/lib/isURL'
import sessionStorage from '~modules/sessionStorage'

import { Outlet, Navigate, useSearchParams } from 'react-router-dom'

export default function AccountRedirect() {
    const dispatch = useDispatch()

    const [search] = useSearchParams()
    const authorized = useSelector(state=>userStatus(state).authorized)

    //refresh user state
    useEffect(()=>{
        dispatch(refresh())
    }, [])

    //save redirect link when is specified
    if (search) {
        const { redirect } = Object.fromEntries(new URLSearchParams(search))||{}

        if (redirect && 
            isURL(redirect, {
                require_host: false, 
                host_whitelist: ['raindrop.io', /\.raindrop\.io$/]
            })
        )
            sessionStorage.setItem('redirect', new URL(redirect, location.href).toString())
    }

    //redirect when authorized
    if (authorized == 'yes'){
        //use redirect link saved previously
        const redirect = sessionStorage.getItem('redirect')
        if (typeof redirect == 'string'){
            sessionStorage.removeItem('redirect')

            //redirect inside of an app
            if (redirect.startsWith(window.location.origin))
                return <Navigate to={redirect.replace(window.location.origin, '')} replace />

            //redirect outside
            location.href = redirect
            return null
        }

        //default redirect to homepage
        return <Navigate to='/' replace />
    }

    return (
        <Outlet />
    )
}