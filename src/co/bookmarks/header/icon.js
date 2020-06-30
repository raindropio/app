import React from 'react'
import { connect } from 'react-redux'
import { startSelectMode } from '~data/actions/bookmarks'
import { makeStatus } from '~data/selectors/bookmarks'

import CollectionIcon from '~co/collections/item/icon'
import Button from '~co/common/button'

class BookmarksHeaderIcon extends React.PureComponent {
    static defaultProps = {
        spaceId: 0,
        collection: {}
    }

    onSelectEnableClick = (e)=>{
        e.preventDefault()
        this.props.startSelectMode(this.props.spaceId)
    }

    render() {
        let {
            collection: { _id, cover=[] },
            status
        } = this.props

        if (!cover.length && status.main!='loading') return null

        return (
            <Button onClick={this.onSelectEnableClick}>
                <CollectionIcon
                    _id={_id}
                    cover={cover}
                    loading={status.main=='loading'} />
            </Button>
        )
    }
}

export default connect(
	() => {
        const getStatus = makeStatus()
    
        return (state, { spaceId })=>({
            status: getStatus(state, spaceId)
        })
    },
	{ startSelectMode }
)(BookmarksHeaderIcon)