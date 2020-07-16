import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { getSearchEmpty } from '~data/selectors/bookmarks'
import { makeCollection } from '~data/selectors/collections'

import { Link } from 'react-router-dom'
import Tabs from '~co/common/tabs'

class BookmarksHeaderTitle extends React.Component {
    static defaultProps = {
        spaceId: 0,
        compact: false
    }

    onTabChange = tab => {
        switch(tab) {
            case 'all':
                return this.props.events.onCollectionClick({ _id: 0 })
        }
    }

    render() {
        const {
            collection: { _id, title },
            isSearching,
            compact
        } = this.props

        if (isSearching)
            return (
                <>
                    {t.s('defaultCollection-0')}&nbsp;
                    {t.s('in')}&nbsp;
                    {_id ? (
                        <>
                            &nbsp;
                            <Tabs 
                                items={[{ key: 'current', title: title }, { key: 'all', title: t.s('allBookmarks') }]}
                                active='current'
                                onChange={this.onTabChange} />
                        </>
                    ) : t.s('allBookmarks').toLowerCase()}
                </>
            )

        return compact ? <Link to={'/space/'+_id+'full'}>{title}</Link> : title
    }
}

export default connect(
	() => {
        const getCollection = makeCollection()
    
        return (state, { spaceId })=>({
            collection: getCollection(state, spaceId),
            isSearching: !getSearchEmpty(state, spaceId)
        })
    }
)(BookmarksHeaderTitle)