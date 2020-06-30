import React from 'react'
import t from '~t'

import { Item, ItemIcon, ItemTitle, ItemInfo, ItemActions } from '~co/common/list'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Avatar from '~co/common/avatar'

export default class CollectionSharingCollaboratorsUser extends React.PureComponent {
    onChangeRole = (e)=>{
        const role = e.currentTarget.value
        const userId = parseInt(e.currentTarget.getAttribute('data-userid'))

        this.props.onUserUpdate(userId, { role })
    }

    onRemove = e => {
        const userId = parseInt(e.currentTarget.getAttribute('data-userid'))

        if (confirm(t.s('areYouSure')))
            this.props.onUserUpdate(userId, { role: '' })
    }

    render() {
        const { _id, email_MD5, email, fullName, role, collection } = this.props

        return (
            <Item>
                <ItemIcon>
                    <Avatar src={email_MD5} size='64' />
                </ItemIcon>

                <ItemTitle>
                    {fullName}
                </ItemTitle>

                <ItemInfo>
                    {email}
                </ItemInfo>

                {role!='owner' && collection.access.level>=3 ? (
                    <ItemActions>
                        <Button 
                            Tag='label'
                            variant='link'>
                            <select
                                value={role} 
                                data-userid={_id} 
                                onChange={this.onChangeRole}>
                                {role=='owner' ? <option value='owner'>{t.s('role_owner')}</option> : null}
                                <option value='member'>{t.s('role_member')}</option>
                                <option value='viewer'>{t.s('role_viewer')}</option>
                            </select>
                        </Button>

                        <Button data-userid={_id} onClick={this.onRemove}>
                            <Icon name='trash' />
                        </Button>
                    </ItemActions>
                ) : null}
            </Item>
        )
    }
}