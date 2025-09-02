import React, { useState, useCallback, useMemo } from 'react'
import t from '~t'
import { API_ENDPOINT_URL } from '~data/constants/app'

import { Helmet } from 'react-helmet'
import { Link, useSearchParams } from 'react-router-dom'
import { Layout, Text, Label } from '~co/common/form'
import Button from '~co/common/button'
import Social from '../social'
import Alert from '~co/common/alert'

export default function AccountLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [search] = useSearchParams()
    const redirect = sessionStorage.getItem('redirect') || ''

    const error = useMemo(()=>{
        const { error } = Object.fromEntries(new URLSearchParams(search))||{}
        return error
    }, [search])

    const onChangeEmailField = useCallback(e=>setEmail(e.target.value), [])
    const onChangePasswordField = useCallback(e=>setPassword(e.target.value), [])

    return (
        <form method='POST' action={`${API_ENDPOINT_URL}auth/email/login`}>
            <Helmet><title>{t.s('signIn')}</title></Helmet>

            <Layout>
                {error ? (
                    <Alert variant='danger'>{error}</Alert>
                ) : null}

                <Label>Email {t.s('or')} {t.s('username').toLowerCase()}</Label>
                <Text
                    type='text'
                    name='email'
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
                    required
                    value={password}
                    onChange={onChangePasswordField} />

                <input type='hidden' name='redirect' value={redirect} />

                <Button
                    as='input'
                    type='submit'
                    variant='primary'
                    data-block
                    value={t.s('signIn')} />

                <Social />

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