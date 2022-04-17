import React, { useEffect, useState } from 'react'
import t from '~t'
import { Navigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { errorReason } from '~data/selectors/user'
import { loginWithJWT } from '~data/actions/user'

import { Error } from '~co/overlay/dialog'
import Preloader from '~co/common/preloader'
import Button from '~co/common/button'

export default function JWT() {
    const [search] = useSearchParams()

    const dispatch = useDispatch()
    const error = useSelector(state=>errorReason(state).jwt)
    const [redirectHome, setRedirectHome] = useState(false)

    useEffect(()=>{
        const { token } = Object.fromEntries(new URLSearchParams(search))||{}
        dispatch(loginWithJWT(token))
    }, [search])

    useEffect(()=>{
        if (error)
            Error(error)
                .then(()=>setRedirectHome(true))
    }, [error])

    if (redirectHome)
        return <Navigate to='/' />

    return (
        <Button 
            data-block
            disabled>
            <Preloader />
            {t.s('signIn')}…
        </Button>
    )
}