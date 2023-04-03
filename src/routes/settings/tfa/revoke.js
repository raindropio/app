import React, { useState, useCallback } from 'react'
import t from '~t'
import { useSelector, useDispatch } from 'react-redux'
import { user } from '~data/selectors/user'
import { tfaRevoke } from '~data/actions/user'

import { Layout, Label, Text, Buttons } from '~co/common/form'
import Button from '~co/common/button'
import Modal, { Header } from '~co/overlay/modal'
import { Error } from '~co/overlay/dialog'

export default function SettingsTfaRevoke() {
    const dispatch = useDispatch()
    const { tfa: { enabled } } = useSelector(user)
    const [confirm, setConfirm] = useState(false)
    const [code, setCode] = useState('')

    const onSubmit = useCallback(()=>{
        setConfirm(false)
        dispatch(tfaRevoke({ code }, ()=>{}, Error))
    }, [code])

    if (!enabled)
        return null

    return (
        <Buttons>
            <Button
                variant='outline'
                onClick={()=>setConfirm(true)}>
                {t.s('disable')}
            </Button>

            {confirm ? (
                <Modal onClose={()=>setConfirm(false)}>
                    <Header title={t.s('disable')+' '+t.s('tfa').toLowerCase()} />

                    <form onSubmit={onSubmit}>
                        <Layout>
                            <Label>Enter authentication app code or recovery code</Label>
                            <Text 
                                autoFocus
                                required
                                autoComplete='one-time-code'
                                type='text'
                                name='code'
                                value={code}
                                onChange={(e)=>setCode(e.target.value)} />

                            <Buttons>
                                <Button 
                                    as='input'
                                    type='submit'
                                    value={t.s('disable')}
                                    disabled={!code}
                                    variant='primary' />
        
                                <Button
                                    variant='outline'
                                    onClick={()=>setConfirm(false)}>
                                    {t.s('cancel')}
                                </Button>
                            </Buttons>
                        </Layout>
                    </form>
                </Modal>
            ) : null}
        </Buttons>
    )
}