import React from 'react'
import t from '~t'
import Icon from '~icon'
import environment from '../../helpers/environment'

import contextMenu from '../../modules/contextMenu'
import { openTab } from '../../helpers/clipper'

import bookmarksActions from '../../actions/bookmarks'
import bookmarksStore from '../../stores/bookmarks'
import collectionsStore from '../../stores/collections'
import Pop from '../../actions/pop'
import Toast from '../../actions/toast'

import Tags from '../../co/bookmarks/edit/tags'
import _ from 'lodash'


const toFavorites = _.capitalize(t.s("to")) + " " + t.s("favoriteSites").toLowerCase();

export default class BatchActions extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			step: ""
		}
	}

	updateBookmarks(obj, successText, title) {
		Pop.show('loading',{title: title});
		bookmarksActions.updateSelectedBookmarks(Object.assign({silent: true}, obj), (result)=>{
			if (result){
				Toast.show({title: successText});
				this.setState({step:'',tags:[]});
			}
			else
				Toast.show({title: t.s("saveError"), status:"error"});
			Pop.close();
		})
	}

	like() {
		this.updateBookmarks({
			item: {
				important: true
			}
		}, _.capitalize(t.s("elements2"))+" "+t.s("add").toLowerCase() + " " + toFavorites.toLowerCase(), toFavorites);
	}

	removeLike() {
		this.updateBookmarks({
			item: {
				important: false
			}
		}, t.s("saveSuccess"), t.s("remove")+" "+t.s("from") + " " + t.s("favoriteSites").toLowerCase());
	}

	tag() {
		this.setState({step:'tag'});
	}

	saveTags() {
		this.updateBookmarks({
			item: {
				tags: JSON.parse(JSON.stringify(this.state.tags))
			},
			append: ["tags"]
		}, t.s("saveSuccess"), t.s("addTags"));
	}

	removeTags() {
		this.updateBookmarks({
			item: {
				tags: []
			}
		}, t.s("saveSuccess"), t.s("remove")+" "+t.s("tags").toLowerCase());
	}

	moveTo() {
		this.setState({step:'move_to'});
	}

	remove() {
		Pop.show('loading',{title: t.s("remove")});
		bookmarksActions.removeSelectedBookmarks({silent:true}, ()=>{
			Toast.show({title: 
				(collectionsStore.getCurrentId() == -99 ? t.s("bookmarksRemovedPermament") : t.s("bookmarksRemoved"))
			});
			Pop.close();
		})
	}

	openAll() {
		var selected = bookmarksStore._getSelected();
		selected.forEach((item)=>{
			if (environment.isClipper())
				openTab(item.link)
			else
				window.open(item.link)
		})
	}

	screenshots() {
		Pop.show('loading',{title: t.s("clickToMakeScreenshot")});
		bookmarksActions.setScreenshotSelectedBookmarks((result)=>{
			if (result){
				Toast.show({title: t.s("saveSuccess")});
			}
			else
				Toast.show({title: t.s("saveError"), status:"error"});
			Pop.close();
		})
	}

	reparse() {
		Pop.show('loading',{title: t.s("refresh")+" "+t.s('preview').toLowerCase()});
		bookmarksActions.reparseSelectedBookmarks((result)=>{
			if (result){
				Toast.show({title: t.s("saveSuccess")});
			}
			else
				Toast.show({title: t.s("saveError"), status:"error"});
			Pop.close();
		})
	}

	more(e) {
        if(e) e.preventDefault();

        var items = [
            {label: t.s("openInBrowser"), click: this.openAll.bind(this)},
            {type: "separator"},
            {label: t.s("clickToMakeScreenshot"), click: this.screenshots.bind(this)},
            {label: t.s("refresh")+" "+t.s('preview').toLowerCase(), click: this.reparse.bind(this)},
            {label: t.s("remove")+" "+t.s("tags").toLowerCase(), click: this.removeTags.bind(this)},
            {label: t.s("remove")+" "+t.s("from") + " " + t.s("favoriteSites").toLowerCase(), click: this.removeLike.bind(this)},
        ];

        contextMenu.show(items, {x: e.clientX, y: e.clientY});
    }

	render() {
		var items;
		var selectedAll = (this.props.selected >= this.props.count);

		switch(this.state.step) {
			case "tag":
				items = [(
					<div key="tags" className="superForm maxCenter">
						<figure className="fieldWrap no-border">
							<Tags item={{tags: this.state.tags||[]}} onChange={(tags)=>this.setState({tags:tags})} autoFocus={true} />
						</figure>
					</div>
				), <a key="cancel" className="button default" onClick={()=>this.setState({step:''})} style={{paddingRight: "6px"}}><b>{t.s("cancel")}</b></a>,
				<a key="submit" className="button active" onClick={this.saveTags.bind(this)}><b>{t.s("save")}</b></a>, <b key="blank">&nbsp;</b>];
			break;

			case "move_to":
			break;

			default:
				items = [
					<div key="center" className="maxCenter">&nbsp;</div>,

					<a key="like" className="button active" onClick={this.like.bind(this)} title={toFavorites}><Icon name="like" /><span className="hide-on-small-body">{toFavorites}</span></a>,
					<a key="tag" className="button active" onClick={this.tag.bind(this)} title={t.s("addTags")}><Icon name="tag" /><span className="hide-on-small-body">{t.s("addTags")}</span></a>,
					//<a key="move_to" className="button active" onClick={this.moveTo.bind(this)}><Icon name="move_to" /><span className="hide-on-small-body">{t.s("moveSelectedBookmarks")}</span></a>,
					<a key="trash" className="button active" onClick={this.remove.bind(this)} title={t.s("remove")}><Icon name="trash" /><span className="hide-on-small-body">{t.s("remove")}</span></a>,
					<a key="more" className="button active" onClick={this.more.bind(this)}>{t.s("more")}<Icon name="arrow"/></a>
				];

				if (!selectedAll)
					items.unshift(<a key="selectAll" className="button" onClick={bookmarksActions.selectAll} title={t.s("selectAll")}><Icon name="select_all" /><span className="hide-on-small-body">{t.s("selectAll")}</span></a>);
			break;
		}

		//<a className={"headerBatchActionCheckbox"+(selectedAll ? " checked" : "")} onClick={!selectedAll ? bookmarksActions.selectAll : bookmarksActions.clearSelect} title={t.s("selectAll")}><span className="selectCheckbox"><Icon name="check" /></span></a>
		return (
			<header className={this.props.className+" batchActions"}><div className="headerWrap">
				<a className="button" onClick={bookmarksActions.clearSelect}><Icon name="back"/></a>
				<h1 className="min">
					{this.props.selected + " " + t.s("of") + " " + this.props.count}
				</h1>

				{items}
			</div></header>
		);
	}
}