import React from 'react'
import t from '~t'
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
					alert(t.s('sendInvites')+' '+t.s('server').toLowerCase())
                break
                
				case 'done':
					this.setState({ emails: [] })
					alert(t.s('invitesSendTo')+' '+this.props.sendTo.join(', '))
				break
			}
	}

    handleEmailsChange = (e)=>
        this.setState({ emails: e.target.value })

    handleChangeInviteRole = ()=>
        this.setState({ role: this.state.role=='viewer' ? 'member' : 'viewer' })

    onInviteClick = ()=>{
        if (!this.state.emails)
            return
            
        const { onInvite } = this.props
        onInvite(this.state.emails, this.state.role)
    }

    render() {
        const { emails, role } = this.state
        const { status } = this.props

        const disabled = !emails || status == 'loading'

        return (
            <>
                <div className='separator'>{t.s('inviteMorePeople')}</div>
    
                <div className='item first'>
                    <div className='icon'>
                        <Icon name='add' className='icn-blue' />
                    </div>
    
                    <div className='title'>
                        <textarea 
                            placeholder={t.s('enterEmails')}
                            disabled={status == 'loading'}
                            value={emails}
                            onChange={this.handleEmailsChange}></textarea>
                    </div>
                </div>
            
                <div className='item'>
                    <div className='icon'>
                        <Icon name='lock' className='icn-blue' />
                    </div>
    
                    <div className='title'>
                        <label className='check'>
                            <input 
                                type='checkbox'
                                checked={role=='member'}
                                disabled={disabled}
                                onChange={this.handleChangeInviteRole} />
                            &nbsp;
                            {t.s('role_members')}
                        </label>
                    </div>
    
                    <div className='actions'>
                        
                    </div>
                </div>

                <footer>
                    <a 
                        className='button active'
                        disabled={disabled}
                        onClick={this.onInviteClick}>
                        <b>{t.s('sendInvites')}</b>
                    </a>
                </footer>
            </>
        )
    }
}