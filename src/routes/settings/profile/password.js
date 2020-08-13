import React from 'react'
import t from '~t'
import withEdit from '~co/user/withEdit'

import { Label, Text, Buttons, Title } from '~co/common/form'
import Button from '~co/common/button'

function SettingsProfilePassword({ password, newpassword='', oldpassword='', status, unsaved, onChange, onSubmit }) {
    if (!password)
        return null
    
    return (
        <>
            <Title>{t.s('changePassword')}</Title>

            <Label>{t.s('currentPassword')}</Label>
            <Text 
                required
                type='password'
                disabled={status=='loading'}
                name='oldpassword'
                value={oldpassword}
                onChange={onChange} />

            <Label>{t.s('newPassword')}</Label>
            <Text 
                required
                type='password'
                disabled={status=='loading'}
                name='newpassword'
                value={newpassword}
                onChange={onChange} />

            {unsaved && newpassword && (
                <Buttons>
                    <Button 
                        data-block
                        disabled={status=='loading'}
                        variant='primary'
                        onClick={onSubmit}>
                        {t.s('changePassword')}
                    </Button>
                </Buttons>
            )}
        </>
    )
}

export default withEdit(SettingsProfilePassword, ['newpassword', 'oldpassword'])