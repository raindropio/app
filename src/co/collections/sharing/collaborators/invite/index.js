import React from 'react'
import { connect } from 'react-redux'
import { sharingSendInvites } from '~data/actions/collections'
import { collection } from '~data/selectors/collections'

import View from './view'

class CollectionSharingInvite extends React.Component {
    handlers = {
        onInvite: (role, onSuccess, onFail)=>{
            this.props.sharingSendInvites(this.props._id, role, onSuccess, onFail)
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
        access: collection(state, _id).access
    }),
	{ sharingSendInvites }
)(CollectionSharingInvite)