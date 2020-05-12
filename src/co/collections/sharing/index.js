import React from 'react'
import { connect } from 'react-redux'
import * as actions from '~data/actions/collections'
import { makeDraftItem, makeSharingByRole, getSharingStatus, getSharingCount } from '~data/selectors/collections'
import View from './view'

class CollectionSharing extends React.Component {
    handlers = {
        onPublicClick: ()=>{
            this.props.draftChange(this.props._id, { public: !this.props.collection.public })
            this.props.draftCommit(this.props._id)
        }
    }

    render() {
        return <View 
            {...this.props}
            {...this.handlers} />
    }
}

export default connect(
    () => {
        const getDraftItem = makeDraftItem()
        const getSharingByRole = makeSharingByRole()
    
        return (state, { _id })=>({
            collection: getDraftItem(state, _id),
            users: getSharingByRole(state, _id),
            count: getSharingCount(state, _id),
            status: getSharingStatus(state, _id)
        })
    },
	actions
)(CollectionSharing)