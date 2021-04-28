import React from 'react'
import t from '~t'
import links from '~config/links'

import { Alert } from '~co/overlay/dialog'
import { Layout, Title, Label, Text, Radio, Buttons } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default class CollectionSharingInviteView extends React.PureComponent {
    state = {
        emails: '',
        role: 'member'
    }

    componentDidUpdate(prev) {
		if (prev.status != this.props.status)
			switch(this.props.status) {
                case 'error':
					Alert(t.s('sendInvites')+' '+t.s('server').toLowerCase(), { variant: 'error' })
                break
                
				case 'done':
					this.setState({ emails: '' })
					Alert(t.s('invitesSendTo')+' '+this.props.sendTo.join(', '))
				break
			}
    }

    handleEmailsChange = (e)=>
        this.setState({ emails: e.target.value })

    handleChangeRole = (e)=>
        this.setState({ role: e.currentTarget.value })

    onSubmit = e=>{
        e.preventDefault()

        if (!this.state.emails)
            return
            
        this.props.onInvite(this.state.emails.split(/,|\s/), this.state.role)
    }

    render() {
        const { emails, role } = this.state
        const { status, access } = this.props

        const loading = status == 'loading'

        if (!access || access.level < 3)
            return null

        return (
            <form onSubmit={this.onSubmit}>
                <Layout type='grid'>
                    <Title>{t.s('invite')}</Title>
        
                    <Label>Email</Label>
                    <Text
                        type='email'
                        multiple={true}
                        placeholder={t.s('enterEmails')}
                        disabled={loading}
                        value={emails}
                        required
                        autoFocus
                        onChange={this.handleEmailsChange} />

                    <Label>{t.s('withAccessLevel')}</Label>
                    <div>
                        <Radio 
                            checked={role=='member'}
                            value='member'
                            disabled={loading}
                            onChange={this.handleChangeRole}>
                            {t.s('role_members')+' '+t.s('und')+' '+t.s('invite').toLowerCase()}
                        </Radio>

                        <Radio 
                            checked={role=='viewer'}
                            value='viewer'
                            disabled={loading}
                            onChange={this.handleChangeRole}>
                            {t.s('role_viewer')}
                        </Radio>
                    </div>

                    <Buttons variant='between'>
                        <Button 
                            as='input'
                            type='submit'
                            variant='primary'
                            disabled={loading}
                            data-block
                            value={t.s('sendInvites')+(loading ? '…' : '')} />

                        <Button
                            data-block
                            href={links.help.collaboration}
                            target='_blank'>
                            <Icon name='help' />
                            {t.s('howToUse')}
                        </Button>
                    </Buttons>
                </Layout>
            </form>
        )
    }
}