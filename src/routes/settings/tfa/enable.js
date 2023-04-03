import React, { useState, useCallback } from 'react'
import t from '~t'
import { useSelector, useDispatch } from 'react-redux'
import { user } from '~data/selectors/user'
import { tfaConfigure, tfaVerify } from '~data/actions/user'

import { Layout, Label, Text, Buttons, SubLabel } from '~co/common/form'
import Button from '~co/common/button'
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
    }, [])

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
                    <Label>Step 1</Label>
                    <b>Scan the following QR code in your authenticator app</b>
                    <div/><div><img src={configure.qrCode} /><SubLabel>{configure.secret}</SubLabel></div>

                    <Label>Step 2</Label>
                    <Text 
                        autoFocus
                        required
                        autoComplete='one-time-code'
                        type='text'
                        name='code'
                        placeholder='Enter the code from your authenticator app'
                        disabled={loading}
                        value={code}
                        onChange={e=>setCode(e.target.value)} />
                    
                    <Buttons>
                        <Button 
                            as='input'
                            type='submit'
                            value={t.s('next')}
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
                {t.s('add')}
            </Button>
        )

    return false
}