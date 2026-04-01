import React, { useState, useCallback } from 'react'
import t from '~t'
import withEdit from '~co/user/withEdit'
import { Label, Text, Buttons } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Avatar from './avatar'
import Password from './password'
import ConfirmEmail from './confirm-email'

function SettingsAccountProfile({ name, email, emailConfirmed, password, newpassword='', unsaved, status, onChange, onSubmit }) {
    const [changePassword, setChangePassword] = useState(false)

    const onChangePasswordClick = useCallback(e=>{
        e.preventDefault()
        setChangePassword(true)
    }, [])

    const onChangePasswordClose = useCallback(()=>
        setChangePassword(false)
    , [])

    return (
        <>
            <Label>{t.s('username')}</Label>
            <Text
                required
                disabled={status=='loading'}
                name='name'
                value={name}
                onChange={onChange} />

            <Label>{t.s('email')}</Label>
            <div>
                <Text
                    required
                    disabled={status=='loading'}
                    type='email'
                    name='email'
                    value={email}
                    onChange={onChange} />

                {!emailConfirmed && <ConfirmEmail />}
            </div>

            <Label>{t.s('password')}</Label>

            {!password && email ? (
                <Text
                    required
                    disabled={status=='loading'}
                    type='password'
                    name='newpassword'
                    value={newpassword}
                    onChange={onChange} />
            ) : (
                <div><Button
                    variant='outline'
                    onClick={onChangePasswordClick}>
                    <Icon name='edit' size='micro' />
                    {t.s('changePassword')}
                </Button></div>
            )}

            <Avatar />

            {unsaved && (
                <Buttons>
                    <Button
                        disabled={status=='loading'}
                        variant='primary'
                        onClick={onSubmit}>
                        {t.s('save')}
                    </Button>
                </Buttons>
            )}

            {changePassword && (
                <Password
                    onClose={onChangePasswordClose} />
            )}
        </>
    )
}

export default withEdit(SettingsAccountProfile, ['name', 'email', 'newpassword'])