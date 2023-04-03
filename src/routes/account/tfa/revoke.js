import React, { useState, useCallback } from 'react'
import t from '~t'
import { useDispatch } from 'react-redux'
import { tfaRevoke } from '~data/actions/user'

import { Link, useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Layout, Text, Buttons } from '~co/common/form'
import Button from '~co/common/button'
import Preloader from '~co/common/preloader'
import Header, { Title } from '~co/common/header'
import { Alert, Error } from '~co/overlay/dialog'

export default function PageAccountTfaRevoke() {
    const { token } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [code, setCode] = useState('')
    const [loading, setLoading] = useState(false)

    const onChangeCodeField = useCallback(e=>setCode(e.target.value), [])

    const onSubmit = useCallback(e=>{
        e.preventDefault()
        setLoading(true)

        dispatch(tfaRevoke(
            { token, code },
            ()=>{
                Alert('Your 2FA is disabled now. Please login again.')
                navigate('/account')
            },
            e=>{
                setLoading(false)
                Error(e)
            }
        ))
    }, [code, token, navigate])

    return (<>
        <Helmet><title>{t.s('disable')} {t.s('tfa').toLowerCase()}</title></Helmet>

        <form onSubmit={onSubmit}>
            <Header data-no-shadow>
                <Title>{t.s('disable')} {t.s('tfa').toLowerCase()}</Title>
            </Header>

            <Layout>
                <Text
                    autoFocus
                    type='text'
                    name='code'
                    disabled={loading}
                    required
                    placeholder='Recovery code'
                    value={code}
                    onChange={onChangeCodeField} />

                <Buttons>
                    {loading ? (
                        <Button variant='flat'>
                            <Preloader />
                        </Button>
                    ) : (
                        <Button
                            as='input' 
                            type='submit'
                            variant='primary'
                            value={t.s('disable')}
                            disabled={!code} />
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