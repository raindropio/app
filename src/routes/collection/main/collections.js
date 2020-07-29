import React from 'react'
import SearchCollection from '~co/collections/search'

export default class CollectionMainCollection extends React.Component {
    render() {
        const { search, _id, query: { full }, getLink } = this.props

        if (!search || full) return null

        return (
            <SearchCollection 
                ignore={_id}
                search={search}
                getLink={getLink} />
        )
    }
}