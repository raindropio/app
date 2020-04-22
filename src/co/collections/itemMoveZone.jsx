import React from 'react'
import { DragSource, DropTarget } from 'react-dnd'

import collectionsHelpers from '../../helpers/collections'
import collectionsActions from '../../actions/collections'
import collectionsStore from '../../stores/collections'

class Zone extends React.Component {
	displayName: "collections/itemMoveZone"

	render() {
		const {
			isOver, canDrop, connectDropTarget
		} = this.props;

		var className = "collectionMoveZone", style={};
		if (isOver && canDrop)
			className += " is-drag-over";

		if (this.props.level)
			style.marginLeft = this.props.level*21;

		return connectDropTarget(
			<div className={className} style={style}></div>
		);
	}
}

export default DropTarget(
	"collection",
	{
		canDrop(props, monitor) {
			//props - TO (destination)
			const item = monitor.getItem(); //FROM (is dragging element)

			if (monitor.getItemType()!="collection")
				return false;

			if (props._id == item._id) return false;

			if (typeof props.group != "undefined") return true;

			return collectionsHelpers.canMoveTo(item._id, props._id);
		},

		hover(props, monitor, component) {
			
		},

		drop(to, monitor, component) {
			//to - TO (destination)
			const from = monitor.getItem(); //FROM (is dragging element)

			if (typeof to.group!="undefined"){
				collectionsActions.updateCollection({silent: true, item: {
		    		_id: from._id,
		    		group: parseInt(to.group)
		    	}}, function() {});
		    	return;
			}

			//if (monitor.isOver({ shallow: true })) return; //only 1 time

			var fromUpdate = {
				_id: from._id
			};

			//Firstly prepare FROM
				//if from level is root, remove it from groups
				if (from.level == 0)
					UserStore._removeCollectionFromGroupsById(from._id);

				//if 
				if ((from.level > 0)&&(to.level == 0))
					fromUpdate.group = 0;

			//Destination prepare (TO)
				if (to.level == 0)
					UserStore.onSwapCollections({fromId: from._id, toId: to._id});
				else{
					fromUpdate.parent = {$id: to.parent.$id};
					fromUpdate.parentId = to.parent.$id;

					if (fromUpdate.sort>to.sort)
						fromUpdate.sort = to.sort+0.5;
					else
						fromUpdate.sort = to.sort-0.5;
				}

			//Update FROM
			if (Object.keys(fromUpdate).length>1)
				collectionsActions.updateCollection({silent: true, updateModel: false, item: fromUpdate}, function() {
					collectionsStore._saveChildrensSort();
				});
		}
	},

	function(connect, monitor) {
		return {
			connectDropTarget: connect.dropTarget(),
			isOver: monitor.isOver(),
			isOverCurrent: monitor.isOver({ shallow: true }),
			canDrop: monitor.canDrop(),
			itemType: monitor.getItemType()
		};
	}
)(Zone)