import React from 'react'
import { DropTarget } from 'react-dnd'
import View from './view'
import { type as bookmarkType } from '~co/bookmarks/item/viewWithDnd'

export const type = 'collection'

//Container
class CollectionItemViewWithDrop extends React.Component {
    _view = React.createRef()

    render() {
        const { connectDrop, dndIsDropping, isDropping, ...props } = this.props

        if (this._view.current)
            connectDrop(this._view)

        return (
            <View 
                innerRef={this._view}
                isDropping={dndIsDropping||isDropping}
                {...props} />
        )
    }
}

//React-dnd specific
export default DropTarget(
    [bookmarkType],
    //logic of drop
    {
        canDrop(props, monitor) {
            console.log(props)
        }
    },
    //injected props
    (connect, monitor)=>({
        connectDrop:    connect.dropTarget(),
        dndIsDropping:     monitor.isOver()
    })
)(CollectionItemViewWithDrop)