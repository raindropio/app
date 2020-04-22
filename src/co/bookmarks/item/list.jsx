import React from 'react'
import { getEmptyImage } from 'react-dnd-html5-backend';
import helper from './helper'

import ListBlank from './listBlank'

class Item extends React.Component {
	displayName: 'bookmarks/listItem'

	componentDidMount() {
		this.props.connectDragPreview(getEmptyImage(), {
			captureDraggingState: true
		});
	}

	openReader = (e)=>{
		this.props.openReader(e,this)
	}

	render() {
		const { 
            isDragging, connectDragSource, connectDropTarget
        } = this.props;

        var baseClassName = "element element-list ";
		var isActive = (this.props.activeId==this.props.item._id);

		if (isDragging)
			baseClassName += " is-dragging";
		else {
			if (isActive)
				baseClassName += " active";
		}

		var excerpt = this.props.item.excerpt;
		/*if (typeof this.props.item.pleaseParse != "undefined")
			if (typeof this.props.item.pleaseParse.weight != "undefined")
				excerpt = t.s("importing")+"...";*/

		return connectDropTarget(connectDragSource(// style={this.props.item.important ? {background: colors.lighten(this.props.color, .93)} : null}
			<div><ListBlank {...this.props} baseClassName={baseClassName} openReader={this.openReader} /></div>
		));
	}
}

import itemMixin from "./mixin"
export default itemMixin(
	helper.dropTarget(
		helper.dragSource(Item)
	)
)