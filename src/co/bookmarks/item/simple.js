import React from 'react'
import { getEmptyImage } from 'react-dnd-html5-backend';
import keyvalStore from '~stores/keyval'
import FavIcon from '../../common/favIcon'
import Tags from './tags'
import SuperLink from '../../common/superLink'
import ItemFooter from './footer'
import LabelHighlight from './label'
import helper from './helper'

class Item extends React.Component {
	displayName = "bookmarks/simpleItem"

	componentDidMount() {
		this.props.connectDragPreview(getEmptyImage(), {
			captureDraggingState: true
		});
	}

	render() {
		const { 
            isDragging, connectDragSource, connectDropTarget
        } = this.props;

        var className = "element element-list element-simple ";
		var isActive = (this.props.activeId==this.props.item._id);

		if (isDragging)
			className += " is-dragging";
		else {
			if (isActive)
				className += " active";
		}

		return connectDropTarget(connectDragSource(// style={this.props.item.important ? {background: colors.lighten(this.props.color, .93)} : null}
			<article className={className+this.props.className} id={"element"+this.props.item._id} title={this.props.item.link}>
				{this.props.addToFavorite()}
				<FavIcon className="cover" domain={this.props.item.domain} style={{background:"rgb("+this.props.color+")"}} />
				{this.props.checkIcon}

				<div className="about">
					<LabelHighlight className='title' field='title' item={this.props.item} />
					{this.props.item.highlight && (<div>
					<LabelHighlight className='description' field='excerpt' Element='p' item={this.props.item} />
					<LabelHighlight className='description from-body' field='body' Element='p' item={this.props.item} />
					</div>)}

					<Tags tags={this.props.item.tags} appendQuery={this.props.appendQuery} />
					<ItemFooter 
						className="info-domain"
						cid={this.props.item.collection && this.props.spaceId != this.props.item.collection.$id ? this.props.item.collection.$id : null}
						domain={this.props.item.domain}
						siteName={this.props.item.site}
						created={this.props.item.created}
						lastUpdate={this.props.item.lastUpdate}
						type={this.props.item.type}
						creatorRef={this.props.item.creatorRef}
						pleaseParse={this.props.item.pleaseParse}
						cache={this.props.item.cache} />
				</div>


				{/*<div className="info right hide-on-small-body">
					{strings.fromNow(this.props.item.lastUpdate)}
				</div>*/}

				{this.props.actions}

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
		))
	}
}

import itemMixin from "./mixin"
export default itemMixin(
	helper.dropTarget(
		helper.dragSource(Item)
	)
)