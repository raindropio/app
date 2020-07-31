import React from 'react'
import { connect } from 'react-redux'
import { oneUpload, oneMove } from '~data/actions/bookmarks'
import PickerSourceDrop from '~co/picker/source/drop'

const emptyObject = {}

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

    onDropCustom = ([type, data])=>
        new Promise((res, rej)=>{
            switch(type){
                case 'bookmark':
                    this.props.oneMove(parseInt(data), parseInt(this.props.spaceId), res, rej)
                break

                default:
                    res()
                break
            }
        })

    onDragCustom = (type)=>
        type == 'bookmark'

    render() {
        if (!parseInt(this.props.spaceId))
            return this.props.children(emptyObject)

        return (
            <PickerSourceDrop 
                onFile={this.onUploadFile}
                onCustom={this.onDropCustom}
                validateCustom={this.onDragCustom}>
                {this.props.children}
            </PickerSourceDrop>
        )
    }
}

export default connect(
	undefined,
	{ oneUpload, oneMove }
)(BookmarksDropArea)