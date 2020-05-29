import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as bookmarksActions from '~data/actions/bookmarks'

import SourcePicker from '~co/picker/source/popover'

class BookmarksAdd extends React.Component {
    static defaultProps = {
        spaceId: 0,
        onClose: undefined
    }

    onFile = file=>
        new Promise((res, rej)=>{
            this.props.actions.oneUpload({
                collectionId: this.props.spaceId,
                file
            }, res, rej)
        })

    onLink = link=>
        new Promise((res, rej)=>{
            this.props.actions.oneCreate({
                collectionId: this.props.spaceId,
                link
            }, res, rej)
        })

    render() {
        const { onClose } = this.props

        return (
            <SourcePicker
                onLink={this.onLink}
                onFile={this.onFile}
                onClose={onClose} />
        )
    }
}

export default connect(
	undefined,
	(dispatch)=>({
		actions: bindActionCreators(bookmarksActions, dispatch)
    })
)(BookmarksAdd)