import React from 'react'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import { type as collectionType } from '~co/collections/item/viewWithDrop'
import _ from 'lodash'
import View from './view'

export const type = 'bookmark'

//Container
class BookmarkItemViewWithDnd extends React.Component {
    _view = React.createRef()

    render() {
        const { connectDrop, connectDrag, ...props } = this.props

        if (this._view.current)
            connectDrop(connectDrag(this._view))

        return (
            <View 
                innerRef={this._view}
                {...props} />
        )
    }
}

//Helper for measuring react component fast
const measureComponent = _.memoize(component =>
    findDOMNode(component).getBoundingClientRect()
)

//React-dnd specific
export default DropTarget(
    [type],
    //logic of drop
    {
        canDrop: ({ reorderable })=>
            reorderable,

        hover: ({ selectModeEnabled, view, ...target }, m, component)=>{
            if (!m.canDrop() || m.getItemType()!=type || selectModeEnabled)
                return

            const origin = m.getItem()

            if (target.index == origin.index)
                return

            //React only on move to half of target item
            if (view == 'list' || view == 'simple'){
                const hoverBoundingRect = measureComponent(component);
                const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
                const clientOffset = m.getClientOffset();
                const hoverClientY = clientOffset.y - hoverBoundingRect.top;
                
                if (origin.index < target.index && hoverClientY < hoverMiddleY)
                    return
                
                if (origin.index > target.index && hoverClientY > hoverMiddleY)
                    return
            }

            origin.onReorder({
                order: target.index,
                collectionId: target.collectionId,
                dry: true
            })
            origin.index = target.index
            origin.collectionId = target.collectionId
        },

        drop: ({ selectModeEnabled }, m)=>{
            if (!m.canDrop() || m.getItemType()!=type || selectModeEnabled)
                return

            return { type, ...m.getItem() }
        }
    },
    //injected props
    (connect, monitor)=>({
        connectDrop:    connect.dropTarget(),
        isDropping:     monitor.isOver()
    })
)(
    //drag
    DragSource(
        type,
        {
            beginDrag: ({ index, _id, collectionId, access, onReorder, onMove }) => ({
                index,
                _id,
                collectionId,
                access,

                originalIndex: index,
                originalCollectionId: collectionId,

                onReorder,
                onMove
            }),
            canDrag: ({ access }) => {
                return access.level>=3
            },
            endDrag: (props, monitor) => {
                const origin = monitor.getItem()
                
                if (monitor.didDrop()){
                    const target = monitor.getDropResult()

                    switch(target.type) {
                        //bookmark reorder
                        case type:
                            origin.onReorder({
                                order: target.index,
                                collectionId: target.collectionId
                            })
                            return

                        case collectionType:
                            origin.onMove(target._id)
                            return
                    }
                }
                
                //cancel reorder
                origin.onReorder({
                    order: origin.originalIndex,
                    collectionId: origin.originalCollectionId,
                    dry: true
                })
            }
        },
        (connect, monitor) => ({
            connectDrag:    connect.dragSource(),
            isDragging:     monitor.isDragging()
        })
    )(BookmarkItemViewWithDnd)
)