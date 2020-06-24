import React from 'react'
import { connect } from 'react-redux'
import { makeCollection } from '~data/selectors/collections'

export default connect(
	() => {
        const getCollection = makeCollection()
    
        return (state, { _id })=>{
            const { color } = getCollection(state, _id)

            return {
                color
            }
        }
    }
)(function CollectionAccentColor({ color, children }) {
    return children({ '--accent-color': color })
})