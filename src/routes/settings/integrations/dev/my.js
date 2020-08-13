import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { getMyClients } from '~data/selectors/oauth'
import { myLoad, clientRemove } from '~data/actions/oauth'

import { Item, ItemIcon, ItemTitle, ItemInfo, ItemActions } from '~co/common/list'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import { Confirm } from '~co/overlay/dialog'
import Edit from './edit'

class SettingsIntegrationsMy extends React.Component {
    state = {
        edit: false
    }

    componentDidMount() {
        this.props.myLoad()
    }

    onEditClick = e=>{
        e.preventDefault()
        
        const _id = e.currentTarget.getAttribute('data-id')
        this.setState({ edit: _id })
    }

    onCancelEdit = ()=>
        this.setState({ edit: false })

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
            as='a'
            href=''
            data-id={_id}
            onClick={this.onEditClick}>
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
        const { edit } = this.state

        if (!clients.length)
            return null

        return (
            <>
                {clients.map(this.renderClient)}

                {edit ? (
                    <Edit 
                        _id={edit}
                        onClose={this.onCancelEdit} />
                ) : null}
            </>
        )
    }
}

export default connect(
    state => ({
        clients: getMyClients(state)
    }),
    { myLoad, clientRemove }
)(SettingsIntegrationsMy)