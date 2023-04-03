import React, { useState, useCallback } from 'react'
import t from '~t'
import { useSelector, useDispatch } from 'react-redux'
import { user } from '~data/selectors/user'
import { tfaConfigure, tfaVerify } from '~data/actions/user'

import { Layout, Label, Text, Buttons, SubLabel, Title } from '~co/common/form'
import Button from '~co/common/button'
import Preloader from '~co/common/preloader'
import Icon from '~co/common/icon'
import { Error } from '~co/overlay/dialog'
import Alert from '~co/common/alert'

export default function SettingsTfaEnable() {
    const dispatch = useDispatch()

    const { tfa: { enabled } } = useSelector(user)
    const [configure, setConfigure] = useState({})
    const [verify, setVerify] = useState({})
    const [code, setCode] = useState('')
    const [loading, setLoading] = useState(false)

    const onConfigure = useCallback(()=>{
        if (loading) return
        setLoading(true)
        dispatch(tfaConfigure(
            c=>{
                setConfigure(c)
                setLoading(false)
            },
            e=>{
                Error(e)
                setLoading(false)
            }
        ))
    }, [loading])

    const onVerify = useCallback((e)=>{
        e.preventDefault()
        setLoading(true)
        dispatch(tfaVerify(
            { code },
            v=>{
                setVerify(v)
                setLoading(false)
            },
            e=>{
                Error(e)
                setLoading(false)
            }
        ))
    }, [code])

    if (verify.recoveryCode)
        return (
            <Alert variant='warning'>
                Please save this recovery code: <b>{verify.recoveryCode}</b> in a secure location!<br />
                This code can be used to recover access to your account.
            </Alert>
        )

    if (configure.secret)
        return (
            <form onSubmit={onVerify}>
                <Layout type='grid'>
                    <Title>{t.s('add')} 2FA</Title>

                    <Label>Step 1</Label>
                    <b>Scan QR code in your authenticator app</b>
                    <div/><img src={configure.qrCode} />
                    <div/><SubLabel>{configure.secret}</SubLabel>

                    <Label>Step 2</Label>
                    <Text
                        autoFocus
                        required
                        autoComplete='one-time-code'
                        type='text'
                        name='code'
                        placeholder={t.s('enterTotp')}
                        disabled={loading}
                        value={code}
                        onChange={e=>setCode(e.target.value)} />
                    
                    <Buttons>
                        <Button 
                            as='input'
                            type='submit'
                            value={t.s('continue')}
                            disabled={!code || loading}
                            variant='primary' />
                    </Buttons>
                </Layout>
            </form>
        )

    if (!enabled)
        return (
            <Button
                variant='primary'
                disabled={loading}
                onClick={onConfigure}>
                {loading ? <Preloader style={{color: 'currentColor'}} /> : <Icon name='add' />}
                {t.s('add')}
            </Button>
        )

    return false
}