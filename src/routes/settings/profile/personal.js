import React from 'react'
import _ from 'lodash'
import t from '~t'
import withEdit from '~co/user/withEdit'

import { Label, Text, Buttons, Title } from '~co/common/form'
import Button from '~co/common/button'

function SettingsProfilePersonal({ _id, fullName, email, password, newpassword='', unsaved, status, onChange, onSubmit }) {
    return (
        <>
            <Title>{_.capitalize(t.s('account'))}</Title>

            <Label>{t.s('name')}</Label>
            <Text 
                autoFocus
                required
                disabled={status=='loading'}
                name='fullName'
                value={fullName}
                onChange={onChange} />

            <Label>Email</Label>
            <Text
                required
                disabled={status=='loading'}
                type='email'
                name='email'
                value={email}
                onChange={onChange} />

            <Label>ID</Label>
            <Text
                readOnly
                variant='less'
                defaultValue={_id} />

            {!password && email && (
                <>
                    <Label>{t.s('password')}</Label>
                    <Text
                        required
                        disabled={status=='loading'}
                        type='password'
                        name='newpassword'
                        value={newpassword}
                        onChange={onChange} />
                </>
            )}

            {unsaved && (
                <Buttons>
                    <Button 
                        data-block
                        disabled={status=='loading'}
                        variant='primary'
                        onClick={onSubmit}>
                        {t.s('save')}
                    </Button>
            </Buttons>
            )}
        </>
    )
}

export default withEdit(SettingsProfilePersonal, ['fullName', 'email', 'newpassword'])