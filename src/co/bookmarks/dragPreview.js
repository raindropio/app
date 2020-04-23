import React, { Component } from 'react'
import bookmarksStore from '~stores/bookmarks'
import Icon from '~icon'

const limit = 15;

export default class CustomDragLayerBookmark extends Component {
	renderItem(item) {
		return (<div key={item._id} className="itemWrap"><div className="item">
			<Icon name={item.type} size="micro" />
			<span className="title">{item.title}</span>
		</div></div>);
	}

	render() {
		var items = [], count = 1;
		items.push(this.renderItem(this.props.item));

		if (bookmarksStore.getSelectedCount()){
			var selected = bookmarksStore._getSelected();
			for(var i in selected){
				count++;

				if (selected[i]._id != this.props.item._id){
					if (items.length<=limit)
						items.push(this.renderItem(selected[i]));
				}else
					count--;
			}

			if (count>=limit)
				items.push(<div className="itemWrap"><div className="item">
					<span className="title">+{count-limit}</span>
				</div></div>)
		}

		if (count===1)
			count = <Icon name="move_to" className="flip-horizontal" />

		return (
			<div className="elementDragPreview">
				<div className="count"><span>{count}</span></div>
				<div className="items">
					{items}
				</div>
			</div>
		);
	}
}