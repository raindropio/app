import s from './index.module.styl'
import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { getConnectionsClients } from '~data/selectors/oauth'
import { connectionsLoad, clientRevoke } from '~data/actions/oauth'

import { Label, Separator, Title } from '~co/common/form'
import { Item, ItemIcon, ItemTitle, ItemInfo, ItemActions } from '~co/common/list'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import { Confirm } from '~co/overlay/dialog'

class SettingsIntegrationsConnections extends React.Component {
    componentDidMount() {
        this.props.connectionsLoad()
    }

    onRevokeClick = async e => {
        e.preventDefault()
        const _id = e.currentTarget.getAttribute('data-id')

        if (await Confirm(t.s('areYouSure'), { ok: t.s('remove')+' '+t.s('app').toLowerCase() }))
            this.props.clientRevoke(_id)
    }

    renderClient = ({ _id, name, description, site, icon })=>(
        <Item
            key={_id}
            as='a'
            href={site}
            target='_blank'>
            {icon && <ItemIcon><img src={icon} /></ItemIcon>}
            <ItemTitle>{name}</ItemTitle>
            <ItemInfo>{description}</ItemInfo>
            <ItemActions>
                <Button 
                    data-id={_id}
                    title={t.s('remove')+' '+t.s('app').toLowerCase()}
                    onClick={this.onRevokeClick}>
                    <Icon name='close' />
                </Button>
            </ItemActions>
        </Item>
    )

    render() {
        const { clients } = this.props

        if (!clients.length)
            return null

        return (
            <>
                <Title>{t.s('interest_technology_applications')}</Title>

                <Label>{t.s('connected')}</Label>
                <div className={s.list}>
                    {clients.map(this.renderClient)}
                </div>
    
                <Separator />
            </>
        )
    }
}

export default connect(
    state => ({
        clients: getConnectionsClients(state)
    }),
    { connectionsLoad, clientRevoke }
)(SettingsIntegrationsConnections)