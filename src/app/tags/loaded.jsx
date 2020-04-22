import React from 'react'
import t from 't'
import Icon from 'icon'
import Header from './parts/header'
import SuperOverflow from '../../co/common/superOverflow'

import Item from './parts/item'

const _ = {
	map: require('lodash/map')
}

export default class Loaded extends React.Component {
	constructor(props) {
		super(props)
		this.state={}
	}

	handleBodyScroll = (e)=>{

	}

	renderSorting() {
		return (
			<a key="sort" tabIndex="-1" className="button default select">
				<b>{t.s(this.props.sortingValues[this.props.sort])}&nbsp;<Icon name="dropdown" size="micro" /></b>
				
				<select value={this.props.sort} onChange={(e)=>this.props.changeSort(e.target.options[e.target.selectedIndex].value)}>
					{_.map(this.props.sortingValues, (name,key)=><option key={key} value={key}>{t.s(name)}</option>)}
				</select>
			</a>
		)
	}

	render() {
		const {
			sidebarToggle,
			changeSelection,
			selectAll,
			unselectAll,
			removeItem,
			updateItem,
			removeSelected,
			mergeSelected,

			items=[],
			selected=[],
			loading=[],
			itemsCount=0
		} = this.props;

		const elements = items.map((item,index)=>(
			<Item 	key={item._id}
					item={item}
					selected={selected.indexOf(item._id)!=-1}
					loading={loading.indexOf(item._id)!=-1}
					changeSelection={changeSelection}
					remove={removeItem}
					update={updateItem} />
		))

		var title = "", headerActions;
		if (selected.length){
			title = (<span>{selected.length + " " + t.s("of") + " " + itemsCount + " "}<span className="hide-on-small-body">{t.s('tags').toLowerCase()}</span></span>)
			headerActions = [
				<a key="selectAll" className="button" onClick={selectAll}><Icon name="select_all" /><span className="hide-on-small-body">{t.s("selectAll")}</span></a>,
				<div key="space" className="maxCenter"/>,
				(selected.length>=2?<a key="merge" className="button active" id="mergeSelectedTags" onClick={mergeSelected}><Icon name="duplicates" /><span>{t.s("merge")}<span className="hide-on-small-body">&nbsp;{t.s("tags").toLowerCase()}</span></span></a>:null),
				<a key="remove" className="button active" onClick={removeSelected}><Icon name="trash" /><span>{t.s("remove")}<span className="hide-on-small-body">&nbsp;{t.s("tags").toLowerCase()}</span></span></a>,
				<a key="cancel" className="button active" onClick={unselectAll}><Icon name="clear_circle" /><span className="hide-on-small-body">{t.s("cancel")}</span></a>,
			]
		}else{
			headerActions = [
				this.renderSorting()
			]
		}

		return (
			<section id="main">
				<Header sidebarToggle={sidebarToggle} title={title} actions={headerActions}>

				</Header>

				<SuperOverflow id="mainBody" className="translateFromTopSlightly" onScroll={this.handleBodyScroll}>
					<div className="tags-maintenance">
						{elements}
					</div>
				</SuperOverflow>
			</section>
		);
	}
}