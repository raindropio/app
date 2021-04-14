import React from 'react'
import t from '~t'

import { Confirm } from '~co/overlay/dialog'
import { Item, ItemIcon, ItemTitle, ItemInfo, ItemActions } from '~co/common/list'
import Button from '~co/common/button'
import Select from '~co/common/select'
import Icon, { Avatar } from '~co/common/icon'

export default class CollectionSharingCollaboratorsUser extends React.PureComponent {
    onChangeRole = (e)=>{
        const role = e.target.value
        const userId = parseInt(e.currentTarget.getAttribute('data-userid'))

        if (role && userId)
            this.props.onUserUpdate(userId, { role })
    }

    onRemove = e => {
        const userId = parseInt(e.currentTarget.getAttribute('data-userid'))

        Confirm(t.s('areYouSure'), { variant: 'warning' }).then(yes=>{
            if (yes)
                this.props.onUserUpdate(userId, { role: '' })
        })
    }

    render() {
        const { _id, avatar, email, name, role, collection } = this.props

        return (
            <Item>
                <ItemIcon>
                    <Avatar src={avatar} />
                </ItemIcon>

                <ItemTitle>
                    {name}
                </ItemTitle>

                <ItemInfo>
                    {email}
                </ItemInfo>

                {role!='owner' && collection.access && collection.access.level>=3 ? (
                    <ItemActions>
                        <Select 
                            variant='link'
                            value={role} 
                            data-userid={_id} 
                            onChange={this.onChangeRole}>
                            {role=='owner' ? <option value='owner'>{t.s('role_owner')}</option> : null}
                            <option value='member'>{t.s('role_member')}</option>
                            <option value='viewer'>{t.s('role_viewer')}</option>
                        </Select>

                        <Button data-userid={_id} onClick={this.onRemove}>
                            <Icon name='trash' />
                        </Button>
                    </ItemActions>
                ) : null}
            </Item>
        )
    }
}