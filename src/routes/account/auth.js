import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userStatus } from '~data/selectors/user'
import { refresh } from '~data/actions/user'
import isURL from 'validator/es/lib/isURL'

import { Redirect, withRouter } from 'react-router-dom'

function Auth({ location: { search } }) {
    const dispatch = useDispatch()
    const { authorized } = useSelector(state=>userStatus(state))

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
            }) &&
            window.sessionStorage
        )
            window.sessionStorage.setItem('redirect', new URL(redirect, location.href).toString())
    }

    //redirect when authorized
    if (authorized == 'yes'){
        //use redirect link saved previously
        const redirect = window.sessionStorage && window.sessionStorage.getItem('redirect')
        if (redirect){
            window.sessionStorage.removeItem('redirect')
            location.href = redirect
            return null
        }

        return <Redirect to='/' />
    }

    return null
}

export default withRouter(Auth)