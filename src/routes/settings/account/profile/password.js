import s from './password.module.styl'
import React from 'react'
import t from '~t'
import withEdit from '~co/user/withEdit'

import Modal, { Header } from '~co/overlay/modal'
import { Layout, Label, Text, Buttons } from '~co/common/form'
import Button from '~co/common/button'

class SettingsAccountProfilePassword extends React.Component {
    onSubmit = e => {
        e.preventDefault()
        e.stopPropagation()
        
        this.props.onSubmit(this.props.onClose)
    }

    render() {
        const { newpassword='', oldpassword='', status, onChange, onClose } = this.props

        return (
            <Modal 
                className={s.modal}
                onClose={onClose}>
                <Header title={t.s('changePassword')} />
    
                <form onSubmit={this.onSubmit}>
                    <Layout>
                        <Label>{t.s('currentPassword')}</Label>
                        <Text 
                            autoFocus
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
    
                        <Buttons>
                            <Button 
                                as='input'
                                type='submit'
                                value={t.s('changePassword')}
                                data-block
                                disabled={!oldpassword || !newpassword || status=='loading'}
                                variant='primary' />
    
                            <Button 
                                data-block
                                variant='outline'
                                onClick={onClose}>
                                {t.s('cancel')}
                            </Button>
                        </Buttons>
                    </Layout>
                </form>
            </Modal>
        )
    }
}

export default withEdit(SettingsAccountProfilePassword, ['newpassword', 'oldpassword'])