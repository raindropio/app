import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { oneUpdate } from '~data/actions/collections'
import { getSearchEmpty } from '~data/selectors/bookmarks'

import { Prompt } from '~co/overlay/dialog'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

class BookmarksHeaderRename extends React.Component {
    static defaultProps = {
        spaceId: 0,
        collection: {}
    }

    title = t.s('rename')

    onRenameClick = async()=>{
        const newname = await Prompt(this.title, this.props.collection.title)
        if (newname)
            this.props.oneUpdate(this.props.spaceId, { title: newname })
    }

    render() {
        const { className, isSearching, collection: { _id, access } } = this.props
        if (isSearching || _id <=0 || !access || access.level < 3) return null

        return (
            <Button 
                className={className}
                title={this.title}
                onClick={this.onRenameClick}>
                <Icon name='edit' />
            </Button>
        )
    }
}

export default connect(
	(state, { spaceId })=>({
        isSearching: !getSearchEmpty(state, spaceId)
    }),
	{ oneUpdate }
)(BookmarksHeaderRename)