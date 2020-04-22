import React from 'react'
import { DropTarget } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend';
import Icon from 'icon'
import t from 't'

import bookmarksHelpers from '../../helpers/bookmarks'

class Zone extends React.Component {
	displayName = "App/parts/dropFile"

	render() {
		const {
			isOver, canDrop, connectDropTarget
		} = this.props;

		var className="drop-files";
		if (isOver && canDrop)
			className += " is-drag-over";

		return connectDropTarget(<div className={className}>
			{this.props.children}
		</div>);
	}
}

export default DropTarget(
	[NativeTypes.FILE, NativeTypes.URL],
	{
		canDrop(props, monitor) {
			return true;
		},

		hover(props, monitor, component) {
			
		},

		drop(to, monitor, component) {
			const item = monitor.getItem();

			bookmarksHelpers.drop(item, to.onDropStart);
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