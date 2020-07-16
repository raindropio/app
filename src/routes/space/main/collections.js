import React from 'react'
import SearchCollection from '~co/collections/search'

export default class SpaceMainCollection extends React.Component {
    render() {
        const { search, spaceId, full } = this.props

        if (!search || full) return null

        return (
            <SearchCollection 
                ignore={spaceId}
                search={search} />
        )
    }
}