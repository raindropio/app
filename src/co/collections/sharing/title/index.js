import React from 'react'
import { connect } from 'react-redux'
import { makeCollection } from '~data/selectors/collections'
import View from './view'

class CollectionSharingTitle extends React.Component {
    handlers = {}

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
    }
)(CollectionSharingTitle)