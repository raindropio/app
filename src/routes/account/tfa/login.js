import React, { useState, useCallback, useMemo } from 'react'
import t from '~t'
import { API_ENDPOINT_URL } from '~data/constants/app'
import links from '~config/links'

import { Link, useParams, useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Layout, Text, Buttons, Separator } from '~co/common/form'
import Button from '~co/common/button'
import Header, { Title } from '~co/common/header'
import Alert from '~co/common/alert'

export default function PageAccountTfaLogin() {
    const { token } = useParams()
    const [code, setCode] = useState('')
    const [valid, setValid] = useState(false)
    const [search] = useSearchParams()
    const redirect = sessionStorage.getItem('redirect') || ''

    const error = useMemo(()=>{
        const { error } = Object.fromEntries(new URLSearchParams(search))||{}
        return error
    }, [search])

    const onChangeCodeField = useCallback(e=>{
        setCode(e.target.value)
        setValid(e.target.validity.valid)

        if (e.target.value.length==6)
            e.target.closest('form').requestSubmit()
    }, [])

    return (<>
        <Helmet><title>{t.s('tfa')}</title></Helmet>

        <form method='POST' action={`${API_ENDPOINT_URL}auth/tfa/${token}`}>
            <Header data-no-shadow>
                <Title>{t.s('tfa')}</Title>
            </Header>

            <Layout>
                {error ? (
                    <Alert variant='danger'>{error}</Alert>
                ) : null}

                <Text
                    autoFocus
                    required
                    type='text'
                    inputMode='numeric'
                    pattern='[0-9]*'
                    autoComplete='one-time-code'
                    name='code'
                    placeholder={t.s('enterTotp')}
                    value={code}
                    onChange={onChangeCodeField} />

                <input type='hidden' name='redirect' value={redirect} />

                <Buttons>
                    <Button
                        as='input' 
                        type='submit'
                        variant='primary'
                        value={t.s('signIn')}
                        disabled={!valid} />

                    <Button
                        as={Link}
                        variant='outline'
                        to='/account/login'>
                        {t.s('cancel')}
                    </Button>
                </Buttons>

                <Separator />

                <Buttons variant='between'>
                    <Button 
                        as={Link}
                        variant='link'
                        to={`/account/tfa/revoke/${token}`}
                        tabIndex='1'>
                        {t.s('disable')}
                    </Button>

                    <Button 
                        href={links.help.tfa} 
                        variant='link'
                        target='_blank'>
                        {t.s('help')}
                    </Button>
                </Buttons>
            </Layout>
        </form>
    </>)
}