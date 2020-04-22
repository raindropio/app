import React from 'react'
import ReactDom from 'react-dom'
import shallowCompare from 'react-addons-shallow-compare'
import { DragSource, DropTarget } from 'react-dnd';
import t from 't'
import contextMenu from '../../modules/contextMenu'
import collectionsHelper from '../../helpers/collections'

import collectionsActions from '../../actions/collections'

class Group extends React.Component {
	displayName: "collections/group"

	constructor(props) {
		super(props);
		this.state = {
			title: this.props.item.title,
			edit: (this.props.item.edit?true:false)
		}
	}

	componentDidMount() {
		this.checkIsBlank()
	}

	/*shouldComponentUpdate(nextProps, nextState) {
		if (shallowCompare(this, nextProps.item, nextState.item))
			return true;
		
		return shallowCompare(this, nextProps, nextState);
    }*/

    checkIsBlank() {
    	setTimeout(()=>{
			if (this.state.title == t.s("untitled")){
				var input = ReactDom.findDOMNode(this.refs.input);
				input && input.setSelectionRange(0, input.value.length);
			}
		},0)
    }

    onContextMenu(e) {
		e.preventDefault();
		var items = [];

		if (typeof this.props.item.id != "undefined"){
			items.push({label: t.s("edit"), click: this.handleEdit.bind(this)});
			
			if ((UserStore.getUser().groups||[]).length>1){
				items.push({label: t.s("remove"), click: this.handleRemove.bind(this)});
			}
		}

		if (items.length>0) items.push({type: "separator"});

		items.push({label: t.s("createCollection"), click: this.handleCreateCollection.bind(this)});
		items.push({label: t.s("createGroup"), click: this.handleCreateGroup.bind(this)});

		contextMenu.show(items, {x: e.clientX, y: e.clientY});
	}

	handleEdit() {
		this.setState({edit: true});
		this.checkIsBlank();
	}

	handleRemove() {
		UserStore.onRemoveGroup({
			id: this.props.item.id
		})
	}

	handleCreateCollection() {
		collectionsHelper.createBlank({
			group: parseInt(this.props.index)
		},{edit:true, open: !this.props.embeded});
	}

	handleCreateGroup() {
		collectionsHelper.createBlankGroup({edit:true});
	}

	handleChange(e) {
		this.setState({title: e.target.value})
	}

	handleBlur(e) {
		this.setState({edit: false})

		if (this.state.title != this.props.item.title)
		UserStore.onUpdateGroup({
			id: this.props.item.id,
			item: {
				title: this.state.title||t.s("untitled")
			}
		})
	}

	handleSubmit(e) {
		e.preventDefault();
		this.handleBlur();
	}

	render() {
		const { 
			isDragging, connectDragSource, connectDragPreview,
			isOver, canDrop, connectDropTarget, itemType
		} = this.props;

		var className = "group";

		if ((isOver)&&(canDrop)&&(itemType=="collection"))
			className += " is-drag-over";
		else if (this.props.active)
			className += " active";

		if (isDragging)
			className += " is-dragging";

		var action = null, onClick;
		if (this.props.onSelectGroup){
			onClick = (e)=>{this.props.onSelectGroup(this.props.item,this.props.index)};
			action = <a className="toggle" tabIndex="-1" onClick={onClick}>{t.s("select")}</a>;
		}
		else if (!this.props.onSelectGroup){
			onClick = (e)=>{this.props.onToggleGroup(this.props.item.id)};
			action = <a className="toggle" tabIndex="-1" onClick={onClick}>{t.s(this.props.item.hidden ? "show" : "hide")}</a>;
		}

		var content;
		if (this.state.edit)
			content = (<form onSubmit={this.handleSubmit.bind(this)}>
				<input ref="input" type="text" required autoFocus value={this.state.title} onChange={this.handleChange.bind(this)} onBlur={this.handleBlur.bind(this)} />
			</form>)
		else
			content = <div className="title" onClick={onClick}>{this.props.item.title}</div>;

		return connectDropTarget(connectDragPreview(connectDragSource(
			<div className={className} onContextMenu={this.onContextMenu.bind(this)}>
				{content}
				{action}
			</div>
		)));
	}
}

const Drag = DragSource(
	"group",
	//Implements the drag source contract
	{
		canDrag(props, monitor) {
			return (typeof props.item.id != "undefined");
		},

		beginDrag(props) {
			return {
				index: parseInt(props.index),
				id: props.item.id
			};
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
)(Group);

export default DropTarget(
	["collection", "group"],
	{
		canDrop(props, monitor) {
			return (typeof props.item.id != "undefined");
		},

		hover(to, monitor, component) {
			const from = monitor.getItem();

			switch(monitor.getItemType()) {
				case "group":
					UserStore.onSwapGroups({
						fromId: from.id,
						toId: to.item.id
					});
				break;
			}
		},

		drop(props, monitor, component) {
			//props - to item

			const item = monitor.getItem(); //original dragging item
			switch(monitor.getItemType()) {
				case "collection":
					collectionsActions.updateCollection({silent: true, item: {
			    		_id: item._id,
			    		group: parseInt(props.index)
			    	}}, function() {});
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