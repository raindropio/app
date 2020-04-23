import React from 'react'
import ReactDom from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';

import Api from '~api'
import t from '~t'
import config from '~config'
import { humanNumber } from '~modules/strings'
import contextMenu from '~modules/contextMenu'
import collectionsHelpers from '~modules/collections'
import bookmarksHelpers from '~modules/bookmarks'

import Toasts from '~actions/toast'
import bookmarksStore from '~stores/bookmarks'
import bookmarksActions from '~actions/bookmarks'
import collectionsActions from '~actions/collections'
import collectionsStore from '~stores/collections'
import keyvalActions from '~actions/keyval'
import keyvalStore from '~stores/keyval'
import Pop from '~actions/pop'
import UserStore from '~stores/user'

import CollectionIcon from './icon'
import SuperLink from '../common/superLink'
import Icon from '~icon'

class Item extends React.PureComponent {
	displayName = "collections/item"

	/*shouldComponentUpdate(nextProps, nextState) {
		if (this.props.active != nextProps.active)
            return true;

        if (this.props.embeded != nextProps.embeded)
            return true;

        if (this.props.haveChildrens != nextProps.haveChildrens)
            return true;

        if (this.props.level != nextProps.level)
            return true;

        if (this.props.className != nextProps.className)
            return true;

		if (this.props.item.title != nextProps.item.title)
            return true;

        if (this.props.item.cover != nextProps.item.cover)
            return true;

        if (this.props.item.icon != nextProps.item.icon)
            return true;

        if (this.props.item.count != nextProps.item.count)
            return true;

        if (this.props.item.color != nextProps.item.color)
            return true;

        if (this.props.item.expanded != nextProps.item.expanded)
            return true;

        if (this.props.isDragging != nextProps.isDragging)
            return true;

        if (this.props.isOver != nextProps.isOver)
            return true;

        if (this.props.canDrop != nextProps.canDrop)
            return true;

        return false;
    }*/

	onToggleChildrens(e,_this) {
		_this.onMouseDown(e);
		_this.props.onToggleChildrens();
	}

	onMouseDown(e) {
		var parent = e.target.parentElement;
		setTimeout(()=>{
			if (parent.classList.contains("active")){
				parent.getElementsByClassName("superLink")[0].focus();
			}
		},0);
	}

	openInfo() {
		/*if (!this.props.active)
			window.location.hash = "#/collection/"+this.props.item._id;*/

		if (((keyvalStore.onGet('mode-panel')||{}).cid == this.props.item._id)||(this.props.item._id<=0))
			keyvalActions.remove('mode-panel');
		else
			keyvalActions.set('mode-panel', {page: "collection", cid: this.props.item._id, focus: true});
	}

	onDoubleClick(e) {
		if ((keyvalStore.onGet('mode-panel')||{}).cid != this.props.item._id)
			this.openInfo();
	}

	onClick(e) {	
		if (typeof this.props.onClick == "function") {
			e.preventDefault();
			this.props.onClick(this.props.item)
		}
		else
		if (keyvalStore.onGet('mode-panel'))
			if (keyvalStore.onGet('mode-panel').page=="collection")
				if (this.props.item._id>0)
					keyvalActions.set('mode-panel', {page: "collection", cid: this.props.item._id});
				else
					keyvalActions.remove('mode-panel');
	}

	onContextMenu(e) {
		e.preventDefault();
		var items = [];
		//if (this.props.item._id>0)
			items = [
				{label: t.s("openInBrowser"), href: location.origin+location.pathname+"#/collection/"+this.props.item._id}
			];

		if ((this.props.item._id>0)&&(this.props.item.author))
			items = items.concat([
				{label: t.s("createSubFolder"), click: this.handleCreateCollection.bind(this)},
				{type: "separator"},
				{label: t.s("edit"), click: this.openInfo.bind(this)},
				{label: t.s("remove"), click: this.handleRemove.bind(this)},
			]);

		if (this.props.item._id==-99)
			items = items.concat([
				{type: "separator"},
				{label: t.s("remove") + " " + t.s("all").toLowerCase(), click: collectionsHelpers.cleanTrash},
			]);

		if (items.length)
		contextMenu.show(items, {x: e.clientX, y: e.clientY});
	}

	onKey(e) {
		if (
            ((e.keyCode == 8)&&(e.metaKey || e.ctrlKey))|| //backspace+command
            (e.keyCode == 46) //delete
        )
            this.handleRemove();
	}

	handleCreateCollection() {
		collectionsHelpers.createBlank({
			parentId: parseInt(this.props.item._id),
		}, {edit: true, open: !this.props.embeded});
	}

	handleRemove() {
		collectionsHelpers.remove(this.props.item);
	}

	renderStatus = ()=>{
		let status

		if (this.props.item)
			/*if (this.props.item.public)
				status = 'public'
			else*/ if (this.props.item.collaborators)
				status = 'collaborators'

		if (!status) return

		return (
			<div className="status">
				<Icon name={"status_"+status} />
			</div>
		)
	}

	render() {
		const { 
			isDragging, connectDragSource, connectDragPreview,
			isOver, canDrop, connectDropTarget
		} = this.props;

		var style = {}, className = "collection";
		if (this.props.className)
			className += " "+(this.props.className||"");
		if (this.props.navPrefix!=className)
			className += " "+(this.props.navPrefix||"");
		if ((this.props.active)&&(this.props.item.color))
			style.backgroundColor = this.props.item.color;

		if (this.props.level)
			style.paddingLeft = this.props.level*21;

		if (this.props.haveChildrens){
			if (this.props.item.expanded)
				className += " expanded";
			else
				className += " collapsed";
		}

		if ((isOver)&&(canDrop))
			className += " is-drag-over";
		else if (this.props.active)
			className += " active";

		if (isDragging)
			className += " is-dragging";

		if (collectionsStore.isFound(this.props.item._id))
			className += " found"

		var icon;
		if(this.props.item.icon)
			icon = <Icon name={this.props.item.icon} className="collectionIcon" />;
		else
			icon = <CollectionIcon src={(this.props.item.cover||[])[0]} _id={this.props.item._id} active={this.props.active} />;

		var collectionEditable = ((this.props.item._id||0>0)&&(this.props.item.author));
		//if (this.props.embeded) collectionEditable = false;
		if (collectionEditable)
			className += " have-actions";

		var id = "";
		if (this.props.item._id)
			id = "side-collection-"+this.props.item._id;

		var href = "";
		if (!this.props.onClick)
			href = (this.props.item.link ? this.props.item.link : "#/collection/"+this.props.item._id);

		const element = (
			<article className={className} style={style} id={this.props.id}>
				<span className="expand" onMouseDown={(e)=>this.onMouseDown(e)} onMouseUp={(e)=>this.onToggleChildrens(e,this)}><Icon name="arrow_alt" /></span>
				{icon}
				<div className="title">
					<span>{this.props.item.title}</span>
				</div>

				<div className="space" />

				{this.renderStatus()}

				{typeof this.props.item.count != 'undefined' && <div className="count">{humanNumber(this.props.item.count)||""}</div>}
				{collectionEditable ? <div className="actions" id={id}><span onClick={this.openInfo.bind(this)}>{t.s("editMin")}</span></div> : null}

				<SuperLink
					navPrefix={this.props.navPrefix||"collection"}
					tabIndex={this.props.active ? "1" : undefined}
					href={href}
					onClick={this.onClick.bind(this)}
					onDoubleClick={this.onDoubleClick.bind(this)}
					onEnter={this.openInfo.bind(this)}
					onContextMenu={this.onContextMenu.bind(this)}
					onKey={this.onKey.bind(this)}
					onlyFocus={this.props.embeded ? true : false}
					target={this.props.item.target}
					className="permalink" />
			</article>
		)

		var finalElement = element;
		if (this.props.item._id>0)
			finalElement = connectDragPreview(connectDragSource(finalElement));

		return connectDropTarget(
			finalElement
		);
	}
}

const Drag = DragSource(
	"collection",
	//Implements the drag source contract
	{
		canDrag(props, monitor) {
			return props.item._id>0
		},

		beginDrag(props) {
			if (typeof document !== 'undefined')
				document.body.classList.add("is-collection-dragging-mode");

			return {
				_id: props.item._id,
				level: props.level,
				author: props.item.author,
				parent: props.item.parent,
				sort: props.item.sort,
				dragMode: "isDraggingElement"
			};
		},

		endDrag(props, monitor, component) {
			if (typeof document !== 'undefined')
				document.body.classList.remove("is-collection-dragging-mode");
		}
	},
	//Specifies the props to inject into your component
	function(connect, monitor) {
		return {
			connectDragSource: connect.dragSource(),
			connectDragPreview: connect.dragPreview(),
			isDragging: monitor.isDragging()
		};
	}
)(Item);

export default DropTarget(
	["collection", "element", NativeTypes.FILE, NativeTypes.URL],
	{
		canDrop(props, monitor) {
			//props - TO (destination)
			const item = monitor.getItem(); //FROM (is dragging element)

			switch(monitor.getItemType()){
				case "collection":
					if ((props.item._id<=0)||(!props.item.author))
            			return false;

					return collectionsHelpers.canMoveTo(item._id, props.item._id);
				break;

				case "element":
					if ((props.item._id<=0)||(!props.item.author))
						if ((props.item._id!=-1)&&(props.item._id!=-99))
            				return false;

					return true;
				break;

				default:
					return true;
				break;
			}
		},

		hover(props, monitor, component) {
			
		},

		drop(props, monitor, component) {
			//props - TO (destination)
			const item = monitor.getItem(); //FROM (is dragging element)

			switch(monitor.getItemType()){
				case "collection":
					if (!UserStore.isPro()) {
						Toasts.show({text: t.s("onlyInPro"), title: t.s("nestedCollections"), status: "error"});
						return;
					}

					collectionsActions.updateCollection({silent: true, item: {
			    		_id: item._id,
						parentId: props.item._id,
						expanded: true
			    	}}, function() {})
				break;

				case "element":
					if (props.item._id==item.item.collection.$id){
						bookmarksActions.clearSelect();
						return;
					}

					Pop.show('loading');
					bookmarksStore.onSetSelected({id: item.item._id, selected: true});
					bookmarksActions.updateSelectedBookmarks({
						item: {
							collectionId: props.item._id,
						},
						showingCollectionId: collectionsStore.getCurrentId(),
						//successMessage: t.s("moveSuccess")
						silent: true
					}, ()=>Pop.close());

					return { target: 'collection', collectionId: props.item._id }

					/*if (moveCurrent)
						bookmarksActions.updateBookmark(updObj);*/
				break;

				default:
					item.collectionId = props.item._id;
					bookmarksHelpers.drop(item);
				break;
			}
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
)(Drag)