import React, { useState, useCallback, useEffect } from 'react'
import t from '~t'
import { useDispatch, useSelector } from 'react-redux'
import { userStatus, errorReason, tfaContinueToken } from '~data/selectors/user'
import { loginWithPassword } from '~data/actions/user'

import { Helmet } from 'react-helmet'
import { Link, Navigate } from 'react-router-dom'
import { Layout, Text, Label } from '~co/common/form'
import Button from '~co/common/button'
import Preloader from '~co/common/preloader'
import Social from '../social'
import { Error } from '~co/overlay/dialog'

export default function AccountLogin() {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const status = useSelector(state=>userStatus(state).login)
    const error = useSelector(state=>errorReason(state).login)
    const tfa = useSelector(tfaContinueToken)

    useEffect(()=>{
        if (error) Error(error)
    }, [error])

    const onChangeEmailField = useCallback(e=>setEmail(e.target.value), [])
    const onChangePasswordField = useCallback(e=>setPassword(e.target.value), [])

    const onSubmit = useCallback(e=>{
        e.preventDefault()
        dispatch(loginWithPassword({ email, password }))
    }, [email, password])

    return (
        <form onSubmit={onSubmit}>
            {tfa ? (
                <Navigate to={`/account/tfa/${tfa}`} replace />
            ) : null}

            <Helmet><title>{t.s('signIn')}</title></Helmet>

            <Layout>
                <Label>Email {t.s('or')} {t.s('username').toLowerCase()}</Label>
                <Text
                    type='text'
                    name='email'
                    disabled={status=='loading'}
                    autoFocus
                    required
                    inputMode='email'
                    autoCapitalize='none'
                    spellCheck='false'
                    value={email}
                    onChange={onChangeEmailField} />

                <Label>
                    {t.s('password')}
                    <Button 
                        as={Link}
                        size='small'
                        variant='link'
                        to='/account/lost'
                        tabIndex='1'>
                        {t.s('recoverPassword')}
                    </Button>
                </Label>
                <Text
                    type='password'
                    name='password'
                    disabled={status=='loading'}
                    required
                    value={password}
                    onChange={onChangePasswordField} />

                {status == 'loading' ? (
                    <Button variant='flat' data-block>
                        <Preloader />
                    </Button>
                ) : (
                    <Button
                        as='input' 
                        type='submit'
                        variant='primary'
                        data-block
                        value={t.s('signIn')} />
                )}

                <Social
                    disabled={status == 'loading'} />

                <Button
                    as={Link}
                    to='/account/signup'
                    variant='link'
                    data-block>
                    {t.s('signUp')}
                </Button>
            </Layout>
        </form>
    )
}