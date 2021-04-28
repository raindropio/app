import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { sharingLoad, sharingUpdateUser, sharingUnshare } from '~data/actions/collections'
import { makeCollection, makeSharingByRole, getSharingStatus, getSharingCount } from '~data/selectors/collections'

import { Confirm } from '~co/overlay/dialog'
import { Separator } from '~co/common/form'
import View from './view'
import Invite from './invite'

class CollectionSharingCollaborators extends React.Component {
    componentDidMount() {
        this.props.load(this.props._id)
    }

    handlers = {
        onUserUpdate: (userId, params)=>{
            this.props.updateUser(this.props._id, userId, params)
        },

        onUnshare: async(e)=>{
            if (e && e.preventDefault)
                e.preventDefault()

            if (await Confirm(t.s('areYouSure'), { variant: 'warning' }))
                this.props.unshare(this.props._id)
        }
    }

    render() {
        return (
            <>
                <View {...this.props} {...this.handlers} />
                <Separator />
                <Invite {...this.props} />
            </>
        )
    }
}

export default connect(
    () => {
        const getCollection = makeCollection()
        const getSharingByRole = makeSharingByRole()
    
        return (state, { _id })=>({
            collection: getCollection(state, _id),
            users: getSharingByRole(state, _id),
            count: getSharingCount(state, _id),
            status: getSharingStatus(state, _id)
        })
    },
	{
        load: sharingLoad,
        updateUser: sharingUpdateUser,
        unshare: sharingUnshare
    }
)(CollectionSharingCollaborators)