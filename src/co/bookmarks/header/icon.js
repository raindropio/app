import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { startSelectMode } from '~data/actions/bookmarks'
import { makeStatus, getSearchEmpty } from '~data/selectors/bookmarks'

import { FirstAction } from '~co/common/header'
import CollectionIcon from '~co/collections/item/icon'
import Button from '~co/common/button'
import ChangeIcon from '~co/collections/changeIcon'

class BookmarksHeaderIcon extends React.PureComponent {
    static defaultProps = {
        spaceId: 0,
        collection: {}
    }

    state = {
        show: false
    }

    onIconClick = ()=>
        this.setState({ show: true })

    onIconClose = ()=>
        this.setState({ show: false })

    render() {
        const { collection: { _id, cover=[] }, status, isSearching } = this.props
        const { show } = this.state

        if (!cover.length && status.main!='loading') return null

        return (
            <FirstAction>
                <Button 
                    title={t.s('changeIcon')}
                    onClick={this.onIconClick}>
                    <CollectionIcon
                        _id={_id}
                        cover={cover}
                        loading={status.main=='loading'} />
                </Button>

                {show ? (
                    <ChangeIcon
                        _id={_id}
                        onClose={this.onIconClose} />
                ) : null}
            </FirstAction>
        )
    }
}

export default connect(
	() => {
        const getStatus = makeStatus()
    
        return (state, { spaceId })=>({
            status: getStatus(state, spaceId),
            isSearching: !getSearchEmpty(state, spaceId)
        })
    },
	{ startSelectMode }
)(BookmarksHeaderIcon)