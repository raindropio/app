import React from 'react'
import { getEmptyImage } from 'react-dnd-html5-backend';
import t from 't'

import keyvalStore from '../../../stores/keyval'

import Cover from '../../common/cover'
import Tags from './tags'
import SuperLink from '../../common/superLink'
import ItemFooter from './footer'
import LabelHighlight from './label'
import helper from './helper'

class Item extends React.PureComponent {
	displayName: "bookmarks/gridItem"

	componentDidMount() {
		this.props.connectDragPreview(getEmptyImage(), {
			captureDraggingState: true
		});
	}

	render() {
		const { 
            isDragging, connectDragSource, connectDropTarget
        } = this.props;

		var type = "";
		if (this.props.item.type!="link")
			type = <span>&nbsp;&middot;&nbsp; {t.s(this.props.item.type)}</span>;

		//onLoad={this.handeCoverLoad.bind(this)}

		var className = "element element-grid ";
		var isActive = (this.props.activeId==this.props.item._id);

		if (isDragging)
			className += " is-dragging";
		else{
			if (isActive)
				className += " active";
		}
		
		var withColor = ((this.props.color)&&(this.props.color!="null")&&(this.props.item.important||this.props.withColor));

		return connectDropTarget(connectDragSource(
			<article className={className+this.props.className} style={this.props.style} id={"element"+this.props.item._id} title={this.props.item.link}>
				{this.props.addToFavorite()}
				{this.props.checkIcon}
				<Cover src={this.props.item.cover}
						link={this.props.item.link}
						domain={this.props.item.domain}
						width={460||this.props.coverWidth}
						onLoad={this.props.onImageLoaded}
						 />

				<div className={"about "+(withColor?"dark":"")} style={withColor ? {background:"rgba("+this.props.color+",1)"} : {}}>
					<LabelHighlight className='title' field='title' item={this.props.item} />
					{this.props.item.highlight && (<div>
					<LabelHighlight className='description' field='excerpt' Element='p' item={this.props.item} />
					<LabelHighlight className='description from-body' field='body' Element='p' item={this.props.item} />
					</div>)}
					
					<Tags tags={this.props.item.tags} appendQuery={this.props.appendQuery} />
					
					<ItemFooter 
						cid={this.props.item.collection && this.props.spaceId != this.props.item.collection.$id ? this.props.item.collection.$id : null}
						domain={this.props.item.domain}
						siteName={this.props.item.site}
						created={this.props.item.created}
						lastUpdate={this.props.item.lastUpdate}
						type={this.props.item.type}
						creatorRef={this.props.item.creatorRef}
						pleaseParse={this.props.item.pleaseParse}
						cache={this.props.item.cache}>
					</ItemFooter>

					{this.props.actions}
				</div>

				<SuperLink
					navPrefix="element"
					tabIndex={isActive||(!this.props.activeId && this.props.isFirst) ? "200" : undefined}
					href={this.props.item.link}
					onClick={(e)=>this.props.openReader(e,this)}
					onDoubleClick={this.props.onDoubleClick}
					onKey={this.props.onKey}
					onContextMenu={this.props.onContextMenu}
					target={keyvalStore.onGet("open-links-here") ? "" : "_blank"}
					className="permalink" />
			</article>
		));
	}
}

import itemMixin from "./mixin"
export default itemMixin(
	helper.dropTarget(
		helper.dragSource(Item)
	)
)