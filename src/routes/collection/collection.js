import React from 'react'
import ReactDom from 'react-dom'
import { Helmet } from 'react-helmet'
import Icon from '~icon'
import t from '~t'
import SuperImg from '~co/common/superImg'
import config from '~config'
import colors from '~modules/colors'
import network from '~modules/network'
import collectionsHelpers from '~modules/collections'
import contextMenu from '~modules/contextMenu'
import environment from '~modules/environment'

import keyvalActions from '~actions/keyval'
import keyvalStore from '~stores/keyval'
import bookmarksActions from '~actions/bookmarks'
import bookmarksStore from '~stores/bookmarks'
import collectionsActions from '~actions/collections'
import collectionsStore from '~stores/collections'
import filtersActions from '~actions/filters'
import filtersStore from '~stores/filters'
import userStore from '~stores/user'
import userActions from '~actions/user'
import Pop from '~actions/pop'

import FavIcon from '~co/common/favIcon'
import Bookmarks from '~co/bookmarks'
import Preloader from '~co/common/preloader'
import ThemeColor from '~co/collections/themeColor'
import Search from '~co/search'
import SuperOverflow from '~co/common/superOverflow'
import CollectionIcon from '~co/collections/icon'
import DropFile from './parts/dropFile'
import BatchActions from './parts/batchActions'
import _ from 'lodash'

import MainWrap from '~co/columns/mainWrap'

class Main extends React.Component {
	displayName = "collection"

	lastCid = null

	status = ""

	constructor(props) {
		super(props);
		this.state = {
			collection: {},
			bookmarks: {},
			filters: {items:[]},
			searchOpen: false,
			filtersHide: (keyvalStore.onGet('filters-hide')||false)
		}
	}

	onBookmarksChange = (state)=>{
		this.setState({bookmarks: state})
	}

	onCollectionsChange = ()=>{
		var currentCollection = collectionsStore.getCollection(parseInt(collectionsStore.getCurrentId()))||{};
		var view = keyvalStore.onGet('force-view') || currentCollection.view;
		var isGrid = ((view == "grid")||(view == "masonry"));

		/*if (isGrid)
			keyvalActions.set('mode-reader-modal',true);
		else
			keyvalActions.remove('mode-reader-modal');*/
		this.setState({collection: currentCollection||{}});
	}

	onFiltersChange = (filters)=>{
		if (!filters[this.lastCid]) return false;

		this.setState({filters: filters[this.lastCid]||{items:[]}});
	}

	onKeyvalChange = ()=>{
		var filtersHide = keyvalStore.onGet('filters-hide')||false;
		if (this.state.filtersHide != filtersHide)
			this.setState({filtersHide: filtersHide});
	}

	componentDidMount() {
        this.unsubscribeBookmarks = bookmarksStore.listen(this.onBookmarksChange);
        this.unsubscribeCollections = collectionsStore.listen(this.onCollectionsChange);
        this.unsubscribeFilters = filtersStore.listen(this.onFiltersChange);
        this.unsubscribeKeyval = keyvalStore.listen(this.onKeyvalChange);

        this.openCollection(this.props);
    }

    componentWillUnmount() {
        this.unsubscribeBookmarks();
        this.unsubscribeCollections();
        this.unsubscribeFilters();
        this.unsubscribeKeyval();

        collectionsActions.setCurrent(null, {dontSaveLastId: true});
    }

    openCollection(props,forceRefresh) {
    	var _id = parseInt(props.match.params.cid);
		var nextSearch = props.match.params.search||"[]";

    	var idIsUnchanged = (this.lastCid===_id);
    	var searchIsUnchanged = ((JSON.stringify(this.state.bookmarks.search||[]))==nextSearch);

    	if ((idIsUnchanged)&&(!forceRefresh)&&(searchIsUnchanged))
    		return;

    	this.lastCid = _id;

    	var params = {cid: _id};
    	try{params.search = JSON.parse(nextSearch);}catch(e){}
    	if (forceRefresh){
    		params = Object.assign(params, {
    			sort: props.sort||this.state.bookmarks.sort
    		})
		}

    	var searchIsOpen = ((params.search||[]).length>0);

    	if (!idIsUnchanged)
    		this.setState({bookmarks: {}, collection:{}, showAllFilters: false});
    	if (((params.search||[]).length>0)||(!idIsUnchanged))
    		this.setState({searchOpen: searchIsOpen});
    	else
			searchIsOpen = this.state.searchOpen;
			
		//sort
		if (!params.sort)
		try {params.sort = userStore.getUser().config.raindrops_sort} catch(e){}

    	bookmarksStore.onLoad(params);
    	collectionsStore.onSetCurrent(_id);
    	filtersStore.onSetQuery(params);

    	//if ((!this.state.filtersHide)||(searchIsOpen))
    		filtersStore.onLoad();

    	//markup changes
    	if (!idIsUnchanged) keyvalActions.remove('mode-reader');
    	if (typeof document !== 'undefined') document.getElementById('mainBody').scrollTop=0;
    	this.props.sidebarSmartClose();

    	//set focus
		if (!searchIsUnchanged){
			if ((params.search||[]).length>0){
				try{document.getElementById('searchmain').focus()}catch(e){}
			}
		}
		else
	    	setTimeout(function(){
				try{
					var activeElem = document.querySelectorAll(".collection.active .superLink")[0];
					activeElem.blur();
					activeElem.focus();
				}catch(e){}
			},1)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
    	this.openCollection(nextProps);
    }

	loadMore = ()=>{
		bookmarksStore.onLoad({
			cid: this.state.bookmarks.cid,
			sort: this.state.bookmarks.sort,
			search: this.state.bookmarks.search,
			page: this.state.bookmarks.page+1
		});
	}

	refresh() {
		this.openCollection(this.props,true);
	}

	openInfo() {
		keyvalActions.set('mode-panel', {page: "collection", cid: this.state.collection._id, focus: true});
	}

	openView() {
		Pop.show("view", {
			id: this.props.match.params.cid,
			pin: "collection_view",
			force: "vertical",
			mousePosition:true
		})
	}

	handleBodyScroll = (e)=>{
		//Header
		var maxHeight = e.target.scrollHeight - e.target.clientHeight,
			currentPosition = e.target.scrollTop;

		if (currentPosition+200 >= maxHeight)
			this.loadMore()

		var scrolledState = false;

    	if (e.target.scrollHeight != e.target.clientHeight)
	    	if (e.target.scrollTop>34)
	    		scrolledState = true;

    	if (this.state.scrolled != scrolledState){
    		this.setState({scrolled:scrolledState});
    	}
	}

	handleNewNote() {
		bookmarksActions.insertBookmark({
			item: {
				title: t.s("untitled"),
				collectionId: this.state.collection._id,
				type: "note"
			},
			silent: true
		}, (item)=>{
			keyvalActions.set('mode-reader', item._id);
		});
	}

	//SEARCH -----------------------------------------
	onSearchChangeOpenState(open) {
		if (this.state.searchOpen != open){
			this.setState({searchOpen: open});

			if (open)
				filtersStore.onLoad();
		}
	}

	appendSearchQuery(key,val) {
		var query = Object.assign([], this.state.bookmarks.search||[]);

		var keysCanBeMultiple = ["tag"];
		var replaceIndex = -1;

		query.some((item,index)=>{
			if (item.key==key){
				if (keysCanBeMultiple.indexOf(item.key)!=-1) {
					if (item.val == val){
						replaceIndex = index; return true;
					}
					else return false;
				}else{
					replaceIndex = index; return true;
				}
			}
		});

		if (replaceIndex!=-1){
			if (val)
				query[replaceIndex] = {key: key, val: val};
			else
				query.splice(replaceIndex,1)
		}
		else{
			if (val)
				query.push({key: key, val: val});
		}

		this.submitSearch(query);
	}

	removeSearchQuery(key,val) {
		var query = Object.assign([], this.state.bookmarks.search||[]);

		query = query.filter((item)=>{
			if (typeof key != "object")
				return (!((item.key==key)&&(item.val==val)));
			else{
				var isHave = false;
				for(var i in key){
					isHave = ((item.key==key[i].key)&&(item.val==key[i].val));
					if (isHave) break;
				}

				return !isHave;
			}
		})

		this.submitSearch(query);
	}

	searchEverywhere = (e)=>{
		e && e.preventDefault && e.preventDefault()

		var query = Object.assign([], this.state.bookmarks.search||[]);
		this.submitSearch(query,"0");
	}

	submitSearch(search,collectionID,forceClose) {
		var query = "";
		if ((search||[]).length>0){
			query = "/"+encodeURIComponent(JSON.stringify(search));
		}

		window.location.href='#/collection/'+(collectionID||this.state.collection._id)+query;

		if (((search||[]).length>0)||(forceClose))
			this.setState({searchOpen: (search||[]).length>0});
	}
	//------------------------------------------------
	toggleFilters() {
		keyvalActions.toggle('filters-hide', true);
	}

	renderFilter(key,title,active,type,val,icon) {
		var onClick;
		if ((type)&&(val))
			onClick = this.appendSearchQuery.bind(this, type, val);

		return <a key={"filter"+key} className={"button min filter-item is-filter-"+(type)+(active?" active":"")} onClick={onClick}>{icon}<span className="title">{title}</span></a>;
	}

	toggleFilters() {
		if (this.state.filtersHide)
			keyvalActions.remove('filters-hide',true);
		else
			keyvalActions.set('filters-hide',true,true);
	}

	renderQuickFilter() {
		if (!(this.state.collection||{}).count) return null;
		//if (bookmarksStore.getSelectedCount() > 0) return null;

		var search = (this.state.bookmarks||{}).search||[];
		var items = [/*this.renderFilter(((this.state.bookmarks||{}).count||this.state.collection.count||0)+" "+t.s("elements")+":")*/];
		var limit = 10, isLimitExited = false, actions;
		if (this.state.showAllFilters)
			limit = 9999;

		//if (/*(!this.state.filtersHide)||*/(this.state.searchOpen)){
			if (this.state.collection._id>0)
				if (search.length>0 && this.state.bookmarks.sort!='score'){
					items.push(<a key="filterAll" className="button min is-filter-all" onClick={this.searchEverywhere}><Icon name="open" size="micro" /><span className="title">{t.s("everywhere")}</span></a>)//searchEverywhere
					//items.push(<span key="filterAllSep" className="separator"/>);
				}

			//Important
			if ((this.state.filters.items.important||{}).count>0)
				if (_.findIndex(search, {key: "important"})==-1)
					items.push(this.renderFilter("important", t.s("favoriteSites")/* this.state.filters.items.important.count+ " " + t.s("favoriteSites").toLowerCase()*/, false, 'important', "1", <Icon name="important" size="micro" />));

			//broken
			if ((this.state.filters.items.broken||{}).count>0)
				if (_.findIndex(search, {key: "broken"})==-1)
					items.push(this.renderFilter("broken", t.s("broken")/* this.state.filters.items.important.count+ " " + t.s("favoriteSites").toLowerCase()*/, false, 'broken', "1", <Icon name="broken" size="micro" />));

			//if (this.state.searchOpen){
				//Types
				//if (_.findIndex(search, {key: "type"})==-1){
					if ((this.state.filters.items.types||[]).length>1)
					this.state.filters.items.types.forEach((item,index)=>{
						switch(item._id){
							case "article": case "image": case "video": case "document": case "audio": /*case "link":*/
								items.push(this.renderFilter("type"+index, t.s(item._id+"s"),false,'type', item._id, /*<Icon name={item._id} size="micro" />*/))
							break;
						}
					});
				//}

				//Notag
				if ((this.state.filters.items.notag||{}).count>0)
				if (_.findIndex(search, {key: "notag"})==-1)
					items.push(this.renderFilter("notag", t.s("noTags"), false, 'notag', "1", <Icon name="tag" size="micro" />));

				//Tags
				if ((this.state.filters.items.tags||[]).length>0)
				this.state.filters.items.tags.some((item,index)=>{
					if (items.length>limit) {isLimitExited = true; return true;}

					if (_.findIndex(search, {key: "tag", val: item._id})==-1)
						items.push(this.renderFilter("tag"+index, item._id, false, 'tag', item._id, <Icon name="tag" size="micro" />));

					return false;
				});

				//Sites
				/*if ((this.state.filters.items.sites||[]).length>0)
				this.state.filters.items.sites.some((item,index)=>{
					if (items.length>limit) return true;

					if (_.findIndex(search, {key: "domain", val: network.cleanDomain(item._id)})==-1)
						items.push(this.renderFilter("site"+index, strings.beautifulDomain(item._id).toLowerCase(), false, 'domain', network.cleanDomain(item._id), <FavIcon domain={item._id} className="domain-icon"/>));

					return false;
				});*/
			//}
		//}

		//if ((!items.length)&&(this.state.filters.loading!="loading"))
		//	return null;

		if (bookmarksStore.getSelectedCount() > 0){
			items = [
				<span className="filters-title" key="batchFilter">{t.s('helpBatch')+". "+t.s("helpBatchD")}</span>
			];
		}

		return (
			<div className={"quickFilters "+(this.state.showAllFilters?" showAll":"")}>
				<div className="quickFiltersOverlay">{items.length>3 ? <a className="button min" onClick={()=>this.setState({showAllFilters:true})}><span>{t.s("all")+" "+t.s("fastFilter")}</span></a> : null}</div>
				
				{this.renderFooterSort()}
				<span key="filterAllSep" className="separator"/>
				{items.length ? items : <div className="title">&nbsp;{t.s(this.state.filters.loading ? "loading" : "noTags")}</div>}

				{items.length>3 ? <a className="button min lessQuickFilters" onClick={()=>this.setState({showAllFilters:false})}>{t.s("less")}</a> : null}
			</div>
		);
	}

	checkActiveSearchFilter(key) {
		if ((this.state.bookmarks.search||[]).length)
			for(var i in this.state.bookmarks.search)
				if (this.state.bookmarks.search[i].key==key)
					return true;
		return false;
	}

	renderHeader(empty) {
		var className = (!this.state.scrolled ? "no-border" : "content-border");
		if ((this.state.bookmarks.search||[]).length)
			className += " search-is-open";

		//Batch actions
		var selected = bookmarksStore.getSelectedCount();
		if (selected>0)
			return <BatchActions className={className} selected={selected} count={this.state.collection.count} />;


		var sidebarToggleIcon = <Icon name="menu" />;
		/*if ((strings.getCurrentBrowser().indexOf("electron")!=-1)&&(strings.getCurrentBrowser().indexOf("mac")!=-1))
			sidebarToggleIcon = <b><Icon name="sidebar_alt" /></b>;*/

		var more;
		if (this.state.collection._id>0)
			more = (
				<a className="button active  headerMoreButton" title={t.s("collectionEdit")} onClick={this.openInfo.bind(this)}>
					<CollectionIcon src={(this.state.collection.cover||[])[0]} _id={this.state.collection._id} active={true} />
					{/*<Icon name="more" />*/}
				</a>
			);

		var headerItems = [];

		switch(this.state.collection._id) {
			case -99:
				headerItems.push(
					<a key="headTrash" tabIndex="298" className="button active" title={t.s("pro_notes")} onClick={collectionsHelpers.cleanTrash}>{t.s("remove")+" "+t.s("all").toLowerCase()}</a>
				);
			break;

			case -1: case 0: break;

			default:
				headerItems = headerItems.concat([
					//<a key="headNote" tabIndex="298" className="button active" title={t.s("pro_notes")} onClick={this.handleNewNote.bind(this)}><Icon name="new_note" /><span className="hide-on-small-body">{t.s("note")}</span></a>,
					//<a key="headShare" tabIndex="298" className="button active" title={t.s("sharing")} onClick={this.openInfo.bind(this)}><Icon name="share" /></a>,
				]);
			break;
		}

		return (
			<header className={className}><div className="headerWrap">
				<Helmet><title>{this.state.collection.title}</title></Helmet>

				<span className="button-toggle-sidebar"><a tabIndex="-1" onClick={this.props.sidebarToggle} className={"button active "/*+(this.props.sidebarIsOpen ? "active" : "")*/} title={t.s("show") + "/" + t.s("hide").toLowerCase() + " " + t.s("myCollections").toLowerCase()}>{sidebarToggleIcon}</a></span>

				{more}
				<Search
					id="main"
					placeholder={this.state.collection.title}
					open={this.state.searchOpen}
					collection={this.state.collection}
					filters={this.state.filters.items}
					query={this.state.bookmarks.search||[]}
					appendQuery={this.appendSearchQuery.bind(this)}
					removeQuery={this.removeSearchQuery.bind(this)}
					submitSearch={this.submitSearch.bind(this)}
					onChangeOpen={this.onSearchChangeOpenState.bind(this)} />
				
				{!empty ? this.renderFooterView() : null}
				{!empty ? this.renderFooterShare() : null}
				
				{headerItems}
			</div>

			
			</header>
		);
	}

	renderContent() {
		var body = null;

		switch(this.status){
			case "init":
				body = null;
			break;

			case "no_items":
				body = (<div className="centerContentWrap desktop-behavior content-wrap">
					<div className="centerContent">
						<div className="centerContentBlock">
							<SuperImg src="empty/no_items.png" height="154" />
							<h2 className="headLabel">{t.s("noBookmarks")}</h2>
							<p className="subHeadLabel">
								{t.s("noItemsTip")}
							</p>

							
							<br/>{environment.isClipper() ? null : <a className="button active" href={config.links.download} target='_blank'>{t.s("install") + " " + t.s("browserExtension").toLowerCase()}</a>}
							<br/><a className="button active" href="#/settings/import">{t.s("importBookmarks")}&nbsp;{t.s("elements2")}</a>

							{this.state.collection._id>0?<p className="subHeadLabel">{t.s("importSuccessInfo")}</p>:null}

							<style dangerouslySetInnerHTML={{__html: ':root {--addButtonAnimation: addButtonAnimation}'}}/>
						</div>
					</div>
				</div>);
			break;

			case "not_found":
				body = (<div className="centerContentWrap desktop-behavior content-wrap">
					<div className="centerContent">
						<div className="centerContentBlock">
							<Icon name="search" className="svgIcon-size-60" style={{opacity: ".3"}} />
							<h2 className="headLabel">{t.s("nothingFound")} {this.state.collection._id > 0 && `${t.s('in')} ${this.state.collection.title}`}</h2>
							{this.state.collection._id > 0 && (
								<p className="subHeadLabel">
									<a href="" onClick={this.searchEverywhere}>{t.s('defaultCollection-0')} {t.s("everywhere").toLowerCase()}</a>
								</p>
							)}
						</div>
					</div>
				</div>);
			break;

			case "error":
				var errorContent = (
					<div className="centerContentBlock">
						<SuperImg src="empty/error.png" className="animation-flying" height="144" />
						<h2 className="headLabel">{t.s("error")}</h2>
						<p className="subHeadLabel">
							<a href="#/collection/0">{t.s("goHome")}</a>,&nbsp;
							<a onClick={this.refresh.bind(this)}>{t.s("refresh")}</a>
						</p>
					</div>
				);

				body = (<div className="centerContentWrap desktop-behavior content-wrap">
					<div className="centerContent">
						{errorContent}
					</div>
				</div>);
			break;

			case "trash_empty":
				body = (<div className="centerContentWrap desktop-behavior content-wrap">
					<div className="centerContent">
						<div className="centerContentBlock">
							<Icon name="trash" className="svgIcon-size-60" style={{opacity: ".3"}} />
							<h2 className="headLabel">{t.s("trashEmpty")}</h2>
						</div>
					</div>
				</div>);
			break;

			default:
				var loadMore;

				if ((this.state.bookmarks.status=="loading")&&(this.state.bookmarks.page>0))
					loadMore = <div className="loadMore is-no-more"><div className="subHeadLabel">{t.s("loading")}&hellip;</div></div>;
				else if (this.state.bookmarks.status=="error_page")
					loadMore = <div className="loadMore">{t.s("server")} <a onClick={this.refresh.bind(this)}>{t.s("refresh")}</a></div>;
				else if ((this.state.bookmarks.status!="loading")&&(!this.state.bookmarks.noMore))
					loadMore = <div className="loadMore"><a className="button default" onClick={this.loadMore}><b>{t.s("more")}</b></a></div>;
				else
					loadMore = <div className="loadMore is-no-more"><div className="subHeadLabel">&nbsp;</div></div>;

				var sort = this.state.bookmarks.sort;
				if (this.checkActiveSearchFilter('best'))
					sort = "rating";

				body = (
					<div className="content-wrap">
						{this.renderQuickFilter()}

						<Bookmarks
							anim={this.state.bookmarks.changed}
							spaceId={this.state.collection._id}
							showRating={false}
							appendQuery={this.appendSearchQuery.bind(this)}
							search={this.state.bookmarks.search}
							items={this.state.bookmarks.bookmarks}
							sort={sort}
							title={this.state.collection.title}
							author={this.state.collection.author || this.state.collection._id<=0}
							view={keyvalStore.onGet('force-view')||this.state.collection.view}
							count={this.state.bookmarks.count}
							selectMode={bookmarksStore.getSelectedCount()>0}>
						</Bookmarks>
					
						{loadMore}
					</div>
				);
			break;
		}

		return (
			<SuperOverflow id="mainBody" className={"status-"+this.status} onScroll={this.handleBodyScroll}>
				
				{body}
			</SuperOverflow>
		);
	}

	renderFooterFiltersToggle() {
		if (!this.state.filtersHide)
			return null;

		var count = 0;
		/*for(var i in this.state.filters.items){
			count += this.state.filters.items[i].length||0;
		}*/

		return (
			<a tabIndex="-1" className="button toolbar-button" title={_.capitalize(t.s("fastFilter"))} onClick={this.toggleFilters.bind(this)}>
				<Icon name="sort" /><span className={"badge "+(!count?"hidden":"")}>{count}</span>
			</a>
		);
	}

	renderFooterShare() {
		if (this.state.collection._id<=0)
			return null;

		return (
			<a id="collectionSharingLinkToolbar" tabIndex="-1" className="button active toolbar-button" title={t.s("share")} onClick={()=>Pop.show('sharing',{pin: "collectionSharingLinkToolbar", collection:this.state.collection, force:"vertical"})}>
				<Icon name="share" />
				<span className="hide-on-small-body">{t.s("share")}</span>
			</a>
		);
	}

	changeSort(raindrops_sort) {
		var props = JSON.parse(JSON.stringify(this.props));
		props.sort = raindrops_sort;
		userActions.updateConfig({ raindrops_sort })
		keyvalActions.set("raindrops_sort", props.sort, true)
		sessionStorage.setItem('forceSort'+this.state.collection._id, 1)

        this.openCollection(props, true);
	}

	handleSort(e) {
		e.preventDefault();
        var select = ReactDom.findDOMNode(this.refs.sort);

        this.changeSort(select.options[select.selectedIndex].value);
	}

	renderFooterSort() {
		var sortLabel = "";
		switch(this.state.bookmarks.sort) {
			case "score":sortLabel = t.s('byRelevance');break;
			case "-sort":case "sort":sortLabel = t.s('manual');break;
			case "-created":sortLabel = t.s("byDate")+' ↓';break;
			case "created":sortLabel = t.s("byDate")+' ↑';break;
			case "title":sortLabel = t.s("byName")+' (A-Z)';break;
			case "-title":sortLabel = t.s("byName")+' (Z-A)';break;
			case "domain":sortLabel = t.s("sites")+' (A-Z)';break;
			case "-domain":sortLabel = t.s("sites")+' (Z-A)';break;
			default:sortLabel = t.s("sortBy");break;
		}

		//<span className="hide-on-small-body">&nbsp; {/*t.s("sortBy")+" "+*/_.capitalize(sortLabel)}</span>
		return (
			<a tabIndex="-1" id="collectionSortToolbar" onClick={()=>Pop.show('sort',{pin: "collectionSortToolbar", disableCustomSort: this.state.bookmarks.disableCustomSort, disableScoreSort: this.state.bookmarks.disableScoreSort, active: this.state.bookmarks.sort, onChange: this.changeSort.bind(this), force:"vertical", mousePosition:true})} className="button min" title={t.s("sortBy")}>
				<span className="title">{t.s("sortMin")}</span>&nbsp;
				<span className="title">{sortLabel.toLowerCase()}</span>&nbsp;
				<Icon name="dropdown" size="micro" />
			</a>
		);
	}

	renderFooterView() {
		var view = (this.state.collection||{}).view||"list";
		var viewLabel = t.s("view_"+view);
		//<span className="hide-on-small-body">{viewLabel}</span>
		//<span className="show-on-small-body">
		return (<a tabIndex="-1" className="button toolbar-button" id="collection_view" onClick={this.openView.bind(this)} title={viewLabel}>
			<Icon name={"view_"+(view=="masonry"?"gallery":view)} />
			<span className="hide-on-small-body">{viewLabel}</span>
			
			{/*<Icon name="arrow" className="hide-on-small-body arrow-icon" />*/}
		</a>);
	}

	themeCSSBlock(c) {
		if (c) {
			var cleanC = "", lighten = c;
			try{cleanC = c.match(/rgb\((.*)\)/)[1];}catch(e) {}
			try{lighten = colors.lighten(cleanC,.9);}catch(e){}

			return `
				#main, #reader, #panel, #pop-body, #addNewURL, .clipper-save {
					--accentColor: ${c};
					--accentOverlay: rgba(${cleanC},.1);
					--accentColorLighten: ${lighten};
				}
			`
		}
		else
			return null;
	}

	renderFooter(empty) {
		

		return (
			<footer ref="mainFooter" className="absolute">
				<div className="title">&nbsp;</div>

				
				
				<a className="button" onClick={this.refresh.bind(this)}><Icon name="refresh" /></a>
			</footer>
		);
	}

	render() {
		var empty = false;

		this.status = this.state.bookmarks.status||"init";
		if (this.state.bookmarks.status=="loading"){
			if (Object.keys(this.state.collection)==0)
				this.status = "init";
			if (
				(this.state.bookmarks.status == "loading")&&
				(this.state.bookmarks.page==0)&&
				(this.state.bookmarks.bookmarks.length==0)
			)
				this.status = "init";
		}

		if (this.status=="no_items"){
			if ((this.state.bookmarks.search||[]).length)
				this.status = "not_found";

			if (this.state.collection._id == -99)
				this.status = "trash_empty";
		}

		switch(this.status){
			//case "init":
			case "no_items":
			case "error":
			case "trash_empty":
				empty = true; 
			break;
		}

		var className = "";
		/*switch(keyvalStore.onGet('force-view')||this.state.collection.view){
			case "grid": case "masonry": className="main-gray-background"; break;
		}*/

		if (bookmarksStore.getSelectedCount()>0)
			className="main-gray-background";
			

		return (
			<DropFile><section id="main" className={className}>
				<div className={"overlayPreloader "+(this.status=="init"?"":"hidden")}><Preloader /></div>
				<ThemeColor collection={this.state.collection} cssBlock={this.themeCSSBlock} />
				{this.renderHeader(empty)}
				{this.renderContent()}
				{/*this.renderFooter(empty)*/}
			</section></DropFile>
		);
	}
}

export default MainWrap(Main)