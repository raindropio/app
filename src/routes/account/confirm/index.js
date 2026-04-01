import React, { useEffect, useState } from 'react'
import t from '~t'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { confirmEmail } from '~data/actions/user'

import { Helmet } from 'react-helmet'
import { Layout, Buttons } from '~co/common/form'
import Button from '~co/common/button'
import Preloader from '~co/common/preloader'
import Header, { Title } from '~co/common/header'
import Alert from '~co/common/alert'

export default function PageAccountConfirm() {
    const { token } = useParams()
    const dispatch = useDispatch()

    const [done, setDone] = useState(false)
    const [error, setError] = useState(null)

    useEffect(()=>{
        dispatch(confirmEmail({ token }, ()=>setDone(true), setError))
    }, [token])

    return (<>
        <Helmet><title>{t.s('emailConfirmation')}</title></Helmet>

        <Layout>
            {done ? (<>
                <Header data-fancy>
                    <Title>{t.s('emailConfirmed')}</Title>
                </Header>

                <Buttons>
                    <Button
                        as='a'
                        variant='primary'
                        data-block
                        href='/'>
                        {t.s('goHome')}
                    </Button>
                </Buttons>
            </>) : error ? (
                <Alert variant='danger'>
                    {error?.message || t.s('server')}
                </Alert>
            ) : (
                <Button 
                    data-block
                    disabled>
                    <Preloader />
                    {t.s('emailConfirmation')}…
                </Button>
            )}
        </Layout>
    </>)
}
