import s from './layout.module.styl'
import React, { useEffect, useState } from 'react'
import t from '~t'
import { useDispatch } from 'react-redux'
import { useParams, Navigate } from 'react-router-dom'
import { sharingJoin } from '~data/actions/collections'

import { Helmet } from 'react-helmet'
import Screen from '~co/screen/basic'
import Preloader from '~co/common/preloader'
import Alert from '~co/common/alert'

export default function PageJoin() {
    const { token } = useParams()
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)

    const dispatch = useDispatch()
    
    useEffect(()=>{
        setSuccess(null)
        setError(null)

        dispatch(sharingJoin(token, setSuccess, setError))
    }, [token])

    return (
        <Screen className={s.page} appSize='large'>
            <Helmet><title>{t.s('invite')}</title></Helmet>

            {success ? (
                <Navigate to={`/my/${success}`} replace />
            ) : (
                error ? (
                    <Alert 
                        className={s.alert}
                        variant='danger'>
                        Becoming a member of the collection is impossible.<br/>
                        The URL is invalid or out of date. Please ask the collection's author to invite you again.
                    </Alert>
                ) : <Preloader enlarge='2' />
            )}
        </Screen>
    )
}