import React from 'react'
import { connect } from 'react-redux'
import { userStatus } from '~data/selectors/user'
import isURL from 'validator/es/lib/isURL'

import { Redirect, withRouter } from 'react-router-dom'

function Auth({ authorized, location: { search } }) {
    //save redirect link when is specified
    if (search) {
        const { redirect } = Object.fromEntries(new URLSearchParams(search))||{}

        if (redirect && isURL(redirect, {
            require_host: false, 
            host_whitelist: ['raindrop.io', /\.raindrop\.io$/]
        }))
            sessionStorage.setItem('redirect', new URL(redirect, location.href).toString())
    }

    //redirect when authorized
    if (authorized == 'yes'){
        //use redirect link saved previously
        const redirect = sessionStorage && sessionStorage.getItem('redirect')
        if (redirect){
            sessionStorage.removeItem('redirect')
            location.href = redirect
            return null
        }

        return <Redirect to='/' />
    }

    return null
}

export default withRouter(
    connect(
        (state)=>({
            authorized: userStatus(state).authorized
        })
    )(Auth)
)