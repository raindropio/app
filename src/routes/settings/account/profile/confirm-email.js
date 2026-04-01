import React, { useState, useCallback } from 'react'
import t from '~t'
import { useDispatch } from 'react-redux'
import { sendEmailConfirm } from '~data/actions/user'

import Alert from '~co/common/alert'
import * as Dialog from '~co/overlay/dialog'

export default function ConfirmEmail() {
    const dispatch = useDispatch()
    const [status, setSendEmailStatus] = useState()

    const onSendEmailConfirm = useCallback(e=>{
        e.preventDefault()
        
        setSendEmailStatus('loading')

        dispatch(sendEmailConfirm(
            ()=>{
                Dialog.Alert(t.s('confirmYourEmail'))
                setSendEmailStatus('done')
            },
            e=>{
                setSendEmailStatus(undefined)
                Dialog.Error(e)
            }
        ))
    }, [dispatch])

    return (
        <>
            <br/>
            <Alert variant='warning'>
                {t.s('confirmYourEmail')}
                <br/>
                {!status && (<a href='' onClick={onSendEmailConfirm}>{t.s('resendEmail')}</a>)}
            </Alert>
        </>
    )
}