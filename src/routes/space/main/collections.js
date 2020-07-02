import React from 'react'
import SearchCollection from '~co/collections/search'

export default class SpaceMainCollection extends React.Component {
    render() {
        const { search } = this.props

        if (!search) return null

        return (
            <SearchCollection 
                search={search} />
        )
    }
}