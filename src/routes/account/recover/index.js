import React, { useState, useCallback, useEffect } from 'react'
import t from '~t'
import { useDispatch, useSelector } from 'react-redux'
import { userStatus, errorReason } from '~data/selectors/user'
import { recoverPassword } from '~data/actions/user'

import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Layout, Text, Buttons } from '~co/common/form'
import Button from '~co/common/button'
import Preloader from '~co/common/preloader'
import Header, { Title } from '~co/common/header'
import { Error } from '~co/overlay/dialog'

export default function PageAccountRecover() {
    const { token } = useParams()
    const dispatch = useDispatch()

    const [password, setPassword] = useState('')
    const status = useSelector(state=>userStatus(state).recover)
    const error = useSelector(state=>errorReason(state).recover)

    useEffect(()=>{
        if (error)
            Error(error)
    }, [error])

    const onChangePasswordField = useCallback(e=>
        setPassword(e.target.value), []
    )

    const onSubmit = useCallback(e=>{
        e.preventDefault()
        dispatch(recoverPassword({ password, token }))
    }, [password, token])

    return (<>
        <Helmet><title>{t.s('changePassword')}</title></Helmet>

        {status == 'success' ? (
            <Layout>
                <Header data-fancy>
                    <Title>{t.s('saveSuccess')}</Title>
                </Header>

                <Button
                    as={Link}
                    variant='outline'
                    data-block
                    to='/account/login'>
                    {t.s('signIn')}
                </Button>
            </Layout>
        ) : (
            <form onSubmit={onSubmit}>
                <Header data-no-shadow>
                    <Title>{t.s('newPassword')}</Title>
                </Header>

                <Layout>
                    <Text
                        autoFocus
                        type='password'
                        name='password'
                        disabled={status=='loading'}
                        required
                        value={password}
                        onChange={onChangePasswordField} />

                    <Buttons>
                        {status == 'loading' ? (
                            <Button variant='flat'>
                                <Preloader />
                            </Button>
                        ) : (
                            <Button
                                as='input' 
                                type='submit'
                                variant='primary'
                                value={t.s('changePassword')} />
                            )}

                        <Button
                            as={Link}
                            variant='outline'
                            to='/account/login'>
                            {t.s('cancel')}
                        </Button>
                    </Buttons>
                </Layout>
            </form>
        )}
    </>)
}