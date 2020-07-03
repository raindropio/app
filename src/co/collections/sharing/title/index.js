import React from 'react'
import { connect } from 'react-redux'
import { makeCollection } from '~data/selectors/collections'
import View from './view'

class CollectionSharingTitle extends React.Component {
    render() {
        return <View 
            {...this.props} />
    }
}

export default connect(
    () => {
        const getCollection = makeCollection()
    
        return (state, { _id })=>
            getCollection(state, _id)
    }
)(CollectionSharingTitle)