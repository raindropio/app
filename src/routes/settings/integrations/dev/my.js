import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { getMyClients } from '~data/selectors/oauth'
import { myLoad, clientRemove } from '~data/actions/oauth'

import { Item, ItemIcon, ItemTitle, ItemInfo, ItemActions } from '~co/common/list'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import { Confirm } from '~co/overlay/dialog'

class SettingsIntegrationsMy extends React.Component {
    componentDidMount() {
        this.props.myLoad()
    }

    onRemoveClick = async e => {
        e.preventDefault()
        const _id = e.currentTarget.getAttribute('data-id')
        const name = e.currentTarget.getAttribute('data-name')

        if (await Confirm(t.s('areYouSure'), { ok: t.s('remove')+' '+name }))
            this.props.clientRemove(_id)
    }

    renderClient = ({ _id, name, description, icon })=>(
        <Item
            key={_id}
            as='a'>
            {icon && <ItemIcon><img src={icon} /></ItemIcon>}
            <ItemTitle>{name}</ItemTitle>
            <ItemInfo>{description}</ItemInfo>
            <ItemActions>
                <Button 
                    data-id={_id}
                    data-name={name}
                    title={t.s('remove')+' '+t.s('app').toLowerCase()}
                    onClick={this.onRemoveClick}>
                    <Icon name='close' />
                </Button>
            </ItemActions>
        </Item>
    )

    render() {
        const { clients } = this.props

        if (!clients.length)
            return null

        return clients.map(this.renderClient)
    }
}

export default connect(
    state => ({
        clients: getMyClients(state)
    }),
    { myLoad, clientRemove }
)(SettingsIntegrationsMy)