import React from 'react'
import { connect } from 'react-redux'
import { oneCreate, oneUpload, oneMove, moveSelected } from '~data/actions/bookmarks'
import PickerSourceDrop from '~co/picker/source/drop'

class BookmarksDropArea extends React.Component {
    static defaultProps = {
        spaceId: 0
    }

    onUploadFile = (file)=>
        new Promise((res, rej)=>{
            this.props.oneUpload({
                collectionId: parseInt(this.props.spaceId),
                file
            }, res, rej)
        })

    onDropLink = (link)=>
        new Promise((res, rej)=>{
            this.props.oneCreate({
                collectionId: parseInt(this.props.spaceId),
                link
            }, res, rej)
        })

    onDropCustom = ([type, data])=>
        new Promise((res, rej)=>{
            switch(type){
                case 'bookmark':
                    this.props.oneMove(parseInt(data), parseInt(this.props.spaceId), res, rej)
                break

                case 'selected_bookmarks':
                    this.props.moveSelected(parseInt(data), parseInt(this.props.spaceId), res, rej)
                break

                default:
                    res()
                break
            }
        })

    onDragCustom = (type)=>
        type == 'bookmark' || type == 'selected_bookmarks'

    render() {
        return (
            <PickerSourceDrop 
                onFile={this.onUploadFile}
                onLink={this.onDropLink}
                onCustom={this.onDropCustom}
                validateCustom={this.onDragCustom}>
                {this.props.children}
            </PickerSourceDrop>
        )
    }
}

export default connect(
	undefined,
	{ oneCreate, oneUpload, oneMove, moveSelected }
)(BookmarksDropArea)