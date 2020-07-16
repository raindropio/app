import React from 'react'
import SearchCollection from '~co/collections/search'

export default class SpaceMainCollection extends React.Component {
    render() {
        const { search, spaceId } = this.props

        if (!search) return null

        return (
            <SearchCollection 
                ignore={spaceId}
                search={search} />
        )
    }
}