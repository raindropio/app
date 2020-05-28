import React from 'react'
import t from '~t'
import Icon from '~co/common/icon'
import Avatar from '~co/common/avatar'

export default class CollectionSharingCollaboratorsUser extends React.PureComponent {
    onChangeRole = (e)=>{
        const role = e.target.value
        const userId = parseInt(e.target.getAttribute('data-userid'))

        this.props.onUserUpdate(userId, { role })
    }

    render() {
        const { _id, first, email_MD5, email, fullName, role, collection } = this.props

        return (
            <div className={'item '+(first?'first':'')}>
                <div className='icon'>
                    <Avatar src={email_MD5} size='64' />
                </div>

                <div className='title'>
                    {fullName}
                    <input type='text' value={email} readOnly />
                </div>

                <div className='actions'>
                    {role!='owner' && collection.access.level>=3 ? (
                        <label className='but select default onlyicons'>
                            <Icon name='settings' />
                            <Icon name='arrow' />

                            <select value={role} data-userid={_id} onChange={this.onChangeRole}>
                                <optgroup label={t.s('withAccessLevel')}>
                                    {role=='owner' ? <option value='owner'>{t.s('role_owner')}</option> : null}
                                    <option value='member'>{t.s('role_member')}</option>
                                    <option value='viewer'>{t.s('role_viewer')}</option>
                                </optgroup>

                                <optgroup label='&#8984;'>
                                    <option value=''>{t.s('remove')}</option>
                                </optgroup>
                            </select>
                        </label>
                    ) : null}
                </div>
            </div>
        )
    }
}