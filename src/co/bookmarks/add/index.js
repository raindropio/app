import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as bookmarksActions from '~data/actions/bookmarks'

import SourcePicker from '~co/picker/source/popover'

class BookmarksAdd extends React.Component {
    static defaultProps = {
        pin: undefined, //pin to dom element
        spaceId: 0,
        onCreateItem: undefined,
        onClose: undefined
    }

    onFile = file=>
        new Promise((res, rej)=>{
            this.props.actions.oneUpload({
                collectionId: this.props.spaceId,
                file
            }, (item)=>{
                this.props.onCreateItem && this.props.onCreateItem(item)
                res(item)
            }, rej)
        })

    onLink = link=>
        new Promise((res, rej)=>{
            this.props.actions.oneCreate({
                collectionId: this.props.spaceId,
                link
            }, (item)=>{
                this.props.onCreateItem && this.props.onCreateItem(item)
                res(item)
            }, rej)
        })

    render() {
        const { pin, onClose } = this.props

        return (
            <SourcePicker
                pin={pin}
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