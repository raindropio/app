import React from 'react'
import { connect } from 'react-redux'
import { sharingSendInvites } from '~data/actions/collections'
import { getSharingSendInvitesStatus, getSharingSendInvitesTo } from '~data/selectors/collections'

import View from './view'

class CollectionSharingInvite extends React.Component {
    handlers = {
        onInvite: (emails, role)=>{
            this.props.sharingSendInvites(this.props._id, emails, role)
        }
    }

    render() {
        return <View 
            {...this.props}
            {...this.handlers} />
    }
}

export default connect(
    (state, { _id })=>({
        status: getSharingSendInvitesStatus(state, _id),
        sendTo: getSharingSendInvitesTo(state, _id)
    }),
	{ sharingSendInvites }
)(CollectionSharingInvite)