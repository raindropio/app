import React from 'react'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import bookmarksActions from '../../../actions/bookmarks'

export default {
	dropTarget: (Item)=>{
		return DropTarget(
			["element"],
			{
				canDrop(props) {
					return props.sort == '-sort' || props.sort == 'sort'
				},
				hover(props, monitor, component) {
					if (!monitor.canDrop() || monitor.getItemType()!='element')
						return

					const origin = monitor.getItem()
					const from = origin.index
					const to = props.index

					if (from === to || origin.selectModeEnabled)
						return

					//React only on move to half of target item
					if (origin.view == 'list' || origin.view == 'simple'){
						const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
						const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
						const clientOffset = monitor.getClientOffset();
						const hoverClientY = clientOffset.y - hoverBoundingRect.top;
						
						if (from < to && hoverClientY < hoverMiddleY)
							return
						
						if (from > to && hoverClientY > hoverMiddleY)
							return
					}

					bookmarksActions.reorderBookmark({ from, to })
					monitor.getItem().index = to
				},
				drop(props, monitor) {
					if (!monitor.canDrop() || monitor.getItemType()!='element' || monitor.getItem().selectModeEnabled)
						return
				}
			},
			function(connect, monitor) {
				return {
					connectDropTarget: connect.dropTarget(),
					isOver: monitor.isOver(),
					isOverCurrent: monitor.isOver({ shallow: true }),
					canDrop: monitor.canDrop(),
					itemType: monitor.getItemType()
				}
			}
		)(Item)
	},

	dragSource: (Item)=>{
		return DragSource(
		    "element",
		    //Implements the drag source contract
		    {
		    	canDrag(props, monitor) {
					return (props.item._id>0);
				},

		        beginDrag(props={}) {
		            return {
						index: props.index,
						originalIndex: props.index,
						view: props.view,
						selectModeEnabled: props.selectModeEnabled,
		                item: props.item||{}
		            };
				},
				
				endDrag(props, monitor) {
					const { index, originalIndex } = monitor.getItem()
					const { target, collectionId } = monitor.getDropResult() || {}

					if (index == originalIndex)
						return

					//Bookmark is moved to another collection, so ignore update of order
					if (target == 'collection' && collectionId != props.item._id)
						return
						
					bookmarksActions.afterReorderBookmark(props.item._id, originalIndex)
				}
		    },
		    // connect.dragPreview(),
		    function(connect, monitor) {
		        return {
		            connectDragSource: connect.dragSource(),
		            connectDragPreview: connect.dragPreview(),
		            isDragging: monitor.isDragging()
		        };
		    }
		)(Item);
	}
}