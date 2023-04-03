import React, { useState, useCallback, useEffect } from 'react'
import t from '~t'
import { useDispatch, useSelector } from 'react-redux'
import { userStatus, errorReason } from '~data/selectors/user'
import { loginWithTFA } from '~data/actions/user'
import links from '~config/links'

import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Layout, SubLabel, Text, Buttons } from '~co/common/form'
import Button from '~co/common/button'
import Preloader from '~co/common/preloader'
import Header, { Title } from '~co/common/header'
import { Error } from '~co/overlay/dialog'
import Icon from '~co/common/icon'

export default function PageAccountTfa() {
    const { token } = useParams()
    const dispatch = useDispatch()

    const [code, setCode] = useState('')
    const [valid, setValid] = useState(false)
    const status = useSelector(state=>userStatus(state).tfa)
    const error = useSelector(state=>errorReason(state).tfa)

    useEffect(()=>{
        if (error)
            Error(error)
    }, [error])

    const onChangeCodeField = useCallback(e=>
        { setCode(e.target.value); setValid(e.target.validity.valid); }, []
    )

    const onSubmit = useCallback(e=>{
        e.preventDefault()
        dispatch(loginWithTFA({ token, code }))
    }, [code, token])

    return (<>
        <Helmet><title>{t.s('tfa')}</title></Helmet>

        <form onSubmit={onSubmit}>
            <Header data-no-shadow>
                <Title>{t.s('tfa')}</Title>
            </Header>

            <Layout>
                <Text
                    autoFocus
                    type='text'
                    inputMode='numeric'
                    pattern='[0-9]*'
                    autoComplete='one-time-code'
                    name='code'
                    disabled={status=='loading'}
                    required
                    placeholder={t.s('enterTotp')}
                    value={code}
                    onChange={onChangeCodeField} />

                <SubLabel>
                    <a href={links.help.tfa} target='_blank'><Icon name='open' size='micro' />&nbsp; {t.s('help')}</a>
                </SubLabel>

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
                            value={t.s('signIn')}
                            disabled={!valid} />
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
    </>)
}