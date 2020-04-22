import React from 'react'
import t from 't'
import strings from '../../modules/strings'

import keyvalActions from '../../actions/keyval'
import keyvalStore from '../../stores/keyval'
import bookmarksActions from '../../actions/bookmarks'
import bookmarksStore from '../../stores/bookmarks'
import Pop from '../../actions/pop'

import Icon from 'icon'
import SuperFrame from '../../co/common/superFrame'

import Edit from '../../co/bookmarks/edit'
import Preview from './preview'
import Cache, { getCacheLink } from './cache'
import Tabs from '../../co/common/tabs'
import ChildView from './child'

export default class Sidebar extends React.Component {
	displayName: "reader/index"
	lastScrollPos: 0

	constructor(props) {
		super(props);

		this.handleImportant = this.handleImportant.bind(this);

		this.state = Object.assign(this.prepareTheme(), this.prepareItem(keyvalStore.onGet("mode-reader")), {
			fullscreen: keyvalStore.onGet("mode-reader-fullscreen")||false,
			tab: keyvalStore.onGet("mode-reader-default-tab")||'',
			scrolled: false
		});
	}

	prepareTheme() {
		var state = {scrolled: false, fontSize: 1};
		try {state.fontSize = UserStore.getUser().config["font_size"] || 1} catch(e){}
    	try {state.fontColor = UserStore.getUser().config["font_color"] || ""} catch(e){}
    	try {state.fontFamily = UserStore.getUser().config["font_family"] || ""} catch(e){}

    	return state;
	}

	getBookmark(id) {
		return bookmarksStore.getBookmark(id)||{}
	}

	prepareItem(params) {
		params = params||{};
		var id = parseInt(params.id||0);
		var item = this.getBookmark(id);
		var tab = params.tab || (this.state && this.state.tab) || '';
		var openedTabs = {};

		if (Object.keys(item).length>0) {
			if (tab=="")
				if (item.type == "link")
					tab = item.cache ? "cache" : "web"
				else
					tab = "preview";

			if (this.state)
				openedTabs = JSON.parse(JSON.stringify(this.state.openedTabs));
			openedTabs[tab] = true;
		}

		return {
			id: id,
			item: item,
			tab: tab,
			openedTabs: openedTabs
		};
	}
	
	closeReader = (e)=>{
		if (e)
			e.preventDefault();

		keyvalActions.set('mode-reader-default-tab', this.state.tab, true)
		keyvalActions.remove('mode-reader');
	}

	fullscreenToggle(e) {
		e.preventDefault();
		keyvalActions.toggle('mode-reader-fullscreen', true);
	}

	readerSettings(e) {
		e.preventDefault();
		Pop.show("reader",{pin:"readerSettingsLink", force:"vertical"});
	}

	onKeyvalChange(all) {
		var newState = {scrolled:false};

		var isReaderFullscreen = keyvalStore.onGet('mode-reader-fullscreen')||false;
		if (this.state.fullscreen != isReaderFullscreen)
			newState.fullscreen = isReaderFullscreen;

		var params = Object.assign({}, keyvalStore.onGet("mode-reader")||{});
		var id = parseInt(params.id)||0;

		//if (id>0)
		if (this.state.id != id){
			newState.openedTabs = {};
		}

		if ((this.state.id != id)||(this.state.tab != params.tab)) {
			newState = Object.assign(newState, this.prepareItem(params))

			setTimeout(function(){
				try{
					var activeElem = document.querySelectorAll(".element.active .superLink")[0];
					activeElem.blur();
					activeElem.focus();
				}catch(e){}
			},1)
		}

		this.setState(newState);
	}

	onUserChange(user) {
		this.setState(this.prepareTheme());
	}

	onBookmarksChange() {
		if (!this.state.id) return;

		var newState = this.prepareItem({id: this.state.id, tab: this.state.tab});
		if (Object.keys(newState.item).length>0)
			this.setState(newState);
		else
			this.closeReader();
	}

	componentDidMount() {
        this.unsubscribeKeyval = keyvalStore.listen(this.onKeyvalChange.bind(this));
        this.unsubscribeUser = UserStore.listen(this.onUserChange.bind(this));
        this.unsubscribeBookmarks = bookmarksStore.listen(this.onBookmarksChange.bind(this));

        this.onKey = this.onKey.bind(this);

        if (typeof window !== 'undefined')
        	window.addEventListener('keydown', this.onKey);
    }

    componentWillUnmount() {
        this.unsubscribeKeyval();
        this.unsubscribeUser();
        this.unsubscribeBookmarks();

		this.closeReader()

        if (typeof window !== 'undefined')
        	window.removeEventListener('keydown', this.onKey);
    }

    onKey(e) {
		switch(e.keyCode){
            case 27: //esc
            	if (keyvalStore.onGet('mode-reader')){
	            	e.preventDefault(); e.stopPropagation();
	            	keyvalActions.remove('mode-reader');
	            }
            break;
		}
	}

    onChangeTab(key) {
    	var params = keyvalStore.onGet("mode-reader")||{};
    	keyvalStore.onSet("mode-reader", {
    		id: params.id,
    		tab: key
    	});
    }

    handleScroll(e,_this) {
    	var scrolledState = false;

    	if (e.target.scrollHeight != e.target.clientHeight)
	    	if (_this.lastScrollPos < e.target.scrollTop)
	    		if (e.target.scrollTop>48+10)
	    			scrolledState = true;

	    	_this.lastScrollPos = e.target.scrollTop;

	    	if (_this.state.scrolled != scrolledState)
	    		_this.setState({scrolled: scrolledState});
    }

    handleRemove() {
        bookmarksActions.removeBookmark({
            item: this.state.item
        },()=>{

        });
    }

    handleImportant() {
    	var toSet = {important: !this.state.item.important};

    	bookmarksActions.updateBookmark({
			item: Object.assign({_id: this.state.item._id}, toSet),
			silent: true
		}, (result)=> {

		});
    }

    previewSettings() {
		Pop.show("preview", {
			pin: "preview-settings-button",
			force: "vertical"
		})
	}

	render() {
		var tabItems = [
			{
				key: "web",
				title: `Web`,
				icon: "web"
			},
			{
				key: "edit",
				title: t.s("editMin"),
				icon: "info"
			}
		]

		if (this.state.item.cache)
			tabItems.unshift({
				key: "cache",
				title: (this.state.item.cache.status != 'ready' ? '⚠️ ' : '') + t.s('permanentCopy'),
				icon: "cloud"
			})

		switch(this.state.item.type) {
			case "article": case "image": case "video": case "document": case "audio":
				tabItems.unshift({
					key: "preview",
					title: t.s(this.state.item.type||'link'),
					icon: this.state.item.type
				});
			break;
		}

		return (<div>
			<section 
				key={this.state.id}
				id="reader"
				className={"vfontcolor-"+this.state.fontColor+" vfontsize-"+this.state.fontSize+" vfontfamily-"+(this.state.fontFamily||"default")+" "+(this.state.scrolled?"scrolled":"")}
				data-tab={this.state.tab}>
				<header>
					<div className="headerWrap">
						<a tabIndex="-1" onClick={this.closeReader} className="button" title={t.s("back")}>
							<Icon className="show-on-extension" name="back" />
							<Icon className="hide-on-extension" name={/*this.state.fullscreen ? */"back"/* : "close"*/} />
						</a>
						<a tabIndex="-1" onClick={this.fullscreenToggle} className={"button hide-on-extension hide-on-clipper "+(this.state.fullscreen ? "active" : "")} title={t.s("fullscreen")}><Icon name={"fullscreen"+(this.state.fullscreen ? "_active" : "")} /></a>
						<a tabIndex="-1" className={"button "+(this.state.tab=="edit" ? "invisible" : "")} title={t.s("remove")} onClick={this.readerSettings} id="readerSettingsLink"><Icon name="settings" /></a>
						<a tabIndex="-1" className={"button active "+(this.state.tab!="preview" || this.state.item.type!='article' ? "invisible" : "")} id="preview-settings-button" onClick={this.previewSettings}><Icon name="fonts" /></a>

						<div className="maxCenter">
							<Tabs items={tabItems} active={this.state.tab} onChange={this.onChangeTab.bind(this)} className="hide-on-clipper" />
						</div>

						<a tabIndex="-1" href={this.state.tab=="cache" ? getCacheLink(this.state.item._id) : this.state.item.link} target="_blank" className="button hide-on-extension" title={t.s("open")}><Icon name="open" /></a>
						<a tabIndex="-1" className={"button "+(this.state.item.important ? "active" : '')} onClick={this.handleImportant}  title={t.s("add") +" " + t.s("to") + " " + t.s("favoriteSites").toLowerCase()}><Icon name={"like"+(this.state.item.important ? "_active" : '')} /></a>
						{/*<a tabIndex="-1" className="button hide-on-extension" title={t.s("shareLinkVia")}><Icon name="share" /></a>*/}
						<a tabIndex="-1" className="button" title={t.s("remove")} onClick={this.handleRemove.bind(this)}><Icon name="trash" /></a>
					</div>
				</header>

				{this.state.openedTabs['web'] ? <ChildView onScroll={(e)=>this.handleScroll(e,this)} show={this.state.tab=="web"}><SuperFrame src={(this.state.item||{}).link} domain={(this.state.item||{}).domain} /></ChildView> : null}
				{this.state.openedTabs['cache'] ? <ChildView onScroll={(e)=>this.handleScroll(e,this)} show={this.state.tab=="cache"}><Cache item={this.state.item} /></ChildView> : null}
				{this.state.openedTabs['preview'] ? <ChildView onScroll={(e)=>this.handleScroll(e,this)} show={this.state.tab=="preview"}><Preview item={(this.state.item||{})}/></ChildView> : null}
				{this.state.openedTabs['edit'] ? <ChildView onScroll={(e)=>this.handleScroll(e,this)} show={this.state.tab=="edit"}><Edit item={(this.state.item||{})}/></ChildView> : null}
			</section>

			<div id="reader-black-overlay" onClick={this.closeReader}></div>
		</div>);
	}
}