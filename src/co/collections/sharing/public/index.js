import React from 'react'
import { connect } from 'react-redux'
import { oneUpdate } from '~data/actions/collections'
import { makeCollection } from '~data/selectors/collections'
import View from './view'

class CollectionSharingPublic extends React.Component {
    handlers = {
        onPublicClick: ()=>{
            this.props.oneUpdate(this.props._id, { public: !this.props.public })
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
        const getCollection = makeCollection()
    
        return (state, { _id })=>
            getCollection(state, _id)
    },
	{ oneUpdate }
)(CollectionSharingPublic)