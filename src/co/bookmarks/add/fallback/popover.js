import React from 'react'
import { connect } from 'react-redux'
import { oneUpload, oneCreate } from '~data/actions/bookmarks'

import SourcePicker from '~co/picker/source/popover'

class BookmarksAddPopover extends React.Component {
    onFile = file=>
        new Promise((res, rej)=>{
            this.props.oneUpload({
                collectionId: this.props.spaceId,
                file
            }, (item)=>{
                this.props.onEdit && this.props.onEdit(item)
                res(item)
            }, rej)
        })

    onLink = link=>
        new Promise((res, rej)=>{
            this.props.oneCreate({
                collectionId: this.props.spaceId,
                link
            }, (item)=>{
                this.props.onEdit && this.props.onEdit(item)
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
	{ oneUpload, oneCreate }
)(BookmarksAddPopover)