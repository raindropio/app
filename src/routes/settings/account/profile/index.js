import React from 'react'
import t from '~t'
import withEdit from '~co/user/withEdit'

import { Label, Text, Buttons } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Avatar from './avatar'
import Password from './password'

class SettingsAccountProfile extends React.Component {
    state = {
        changePassword: false
    }

    onChangePasswordClick = e=>{
        e.preventDefault()
        this.setState({ changePassword: true })
    }

    onChangePasswordClose = ()=>
        this.setState({ changePassword: false })

    render() {
        const { name, email, password, newpassword='', unsaved, status, onChange, onSubmit } = this.props

        return (
            <>
                <Label>{t.s('username')}</Label>
                <Text 
                    required
                    disabled={status=='loading'}
                    name='name'
                    value={name}
                    onChange={onChange} />
    
                <Label>Email</Label>
                <Text
                    required
                    disabled={status=='loading'}
                    type='email'
                    name='email'
                    value={email}
                    onChange={onChange} />
    
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
                    <Button 
                        variant='outline'
                        onClick={this.onChangePasswordClick}>
                        <Icon name='edit' size='micro' />
                        {t.s('changePassword')}
                    </Button>
                )}

                <Avatar />
    
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

                {this.state.changePassword && (
                    <Password 
                        onClose={this.onChangePasswordClose} />
                )}
            </>
        )
    }
}

export default withEdit(SettingsAccountProfile, ['name', 'email', 'newpassword'])