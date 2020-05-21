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
        canDrop({ access, _id }) {
            if (!_id || access.level<3)
                return false

            return true
        },

        drop(props) {
            return { type, ...props }
        }
    },
    //injected props
    (connect, monitor)=>({
        connectDrop:    connect.dropTarget(),
        dndIsDropping:  monitor.canDrop() && monitor.isOver()
    })
)(CollectionItemViewWithDrop)