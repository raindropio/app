import React from 'react'
import SearchCollection from '~co/collections/search'

export default class MyMainCollection extends React.Component {
    render() {
        const { search, _id, query: { full }, getLink } = this.props

        if (!search || full) return null

        return (
            <SearchCollection 
                ignore={parseInt(_id)}
                search={search}
                getLink={getLink} />
        )
    }
}