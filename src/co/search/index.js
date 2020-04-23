import React from 'react'
import ReactDom from 'react-dom'
import t from '~t'
import _ from 'lodash'
import colors from '~modules/colors'
import network from '~modules/network'

import Pop from '~actions/pop'
import PopStore from '~stores/pop'

import Icon from '~icon'
import CollectionIcon from '../collections/icon'
import FavIcon from '../common/favIcon'

export default class Search extends React.Component {
	displayName = "search/index"

	removeKeywordPrepared = false
	removeKeywordTimeout = null

	constructor(props) {
		super(props);
		this.state = {
			focus: false,
			word: this.getWord(props.query)
		}
	}

	getWord(query=[]) {
		var word = "";
		if (query.some)
		query.some((item)=>{
			if (item.key=="word"){
				word = item.val||"";
				return true;
			}
		});
		return word;
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (this.state.word=="")
			this.setState({word: this.getWord(nextProps.query)});
		else
	    	if (!this.getWord(nextProps.query))
	    		this.setState({word:""});
    }

	bodyTouch(e) {
		if ((e.target.classList.contains("searchKeywordsWrap"))||(e.target.classList.contains("searchKeywords"))) {
			e.preventDefault();
			ReactDom.findDOMNode(this.refs.searchInput).focus();
		}
	}

	inputOnFocus() {
		this.props.onChangeOpen(true);
		this.setState({focus:true});
	}

	inputOnBlur() {
		this.setState({focus:false})
	}

	removeLastKeyword() {
		if (this.props.query.length==0) return;

		var queryTemp = Object.assign([], this.props.query).reverse();
		var toRemove = [];
		for(var i in queryTemp){
			toRemove.push({
				key: queryTemp[i].key, val: queryTemp[i].val
			});
			
			if (queryTemp[i].key == "word"){
				continue;
			}
			else
				break;
		}

		this.props.removeQuery(toRemove);
	}

	onInputKey(e) {
		switch(e.keyCode){
			case 40: //down
    			this.showContext({selected:0});
    		break;

            case 27: //esc
            	e.preventDefault();
            	this.handleCancel();
            break;

            case 8: //
            	if (!this.state.word){
            		clearTimeout(this.removeKeywordTimeout);
            		this.removeKeywordTimeout = setTimeout(()=>this.removeKeywordPrepared=false,200);
            		this.removeLastKeyword();
            	}
            break;

            case 9: //tab
            	if (e.shiftKey){
            		if (this.tab("collection",e,this))
            			e.preventDefault();
            	}
            	else {
            		if (this.tab("element",e,this))
            			e.preventDefault();
            	}
            break;
		}
	}

	inputOnChange(e) {
		this.state.word = (e.target.value||"");
		this.setState({word: this.state.word});

		this.showContext();
	}

	onSubmitForm(e) {
		if (e)
			e.preventDefault();
		var val = (ReactDom.findDOMNode(this.refs.searchInput).value||"").trim(),
			type = "word";

		if (val.match(new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/)))
			type = "domain";

		if (val.indexOf('#')==0){
			type = "tag";
			val = val.substr(1,val.length);
		}

		this.props.appendQuery(type, val);
	}

	tab(next, e, _this) {
		var nextElem = document.querySelectorAll("."+next+".active");
		if (nextElem.length==0)
			nextElem = document.querySelectorAll("."+next);

		if (!nextElem[0]) return false;
		nextElem = nextElem[0].getElementsByClassName('superLink')[0];
		if (!nextElem) return false;
		nextElem.focus();
		return true;
	}

	handleCancel(e) {
		this.props.submitSearch([],0,true);
        ReactDom.findDOMNode(this.refs.searchInput).blur();
	}

	componentDidUpdate() {
		this.keywordsScrollEnd();
	}

	keywordsScrollEnd() {
		setTimeout(()=>{
			try{
				ReactDom.findDOMNode(this.refs.keywords).scrollLeft = 999999999
			}
			catch(e){}
		},100);
	}

	onKey(e) {
		if ((e.keyCode == 70)&&(e.metaKey || e.ctrlKey)){
			ReactDom.findDOMNode(this.refs.searchInput).focus();
		}
	}

	onClick() {
    	if ((this.state.word||"").trim()=="") return;

    	if (PopStore.isShowing())
    		Pop.close();
    	else
    		this.showContext();
    }

	onDoubleClick() {
		if ((this.state.word||"").trim()!="") return;

    	this.showContext();
	}

	componentDidMount() {
		this.keywordsScrollEnd = this.keywordsScrollEnd.bind(this);

		if (typeof window !== "undefined"){
			window.addEventListener("resize", this.keywordsScrollEnd, false);
			window.addEventListener("orientationchange", this.keywordsScrollEnd, false);

			this.onKey = this.onKey.bind(this);
			window.addEventListener("keydown", this.onKey);
		}
	}

	componentWillUnmount() {
		if (typeof window !== "undefined"){
			window.removeEventListener("resize", this.keywordsScrollEnd, false);
			window.removeEventListener("orientationchange", this.keywordsScrollEnd, false);
			window.removeEventListener("keydown", this.onKey);
		}
	}

	renderAutoComplete() {
		var items = [];
		var makeItem = (title,type,val)=>{
			return <option key={type+"_"+val+"_"+items.length} value={val}>{title}</option>;
		}

		//tags
		if ((this.props.filters.tags||[]).length>0){
			this.props.filters.tags.forEach((item,index)=>{
				items.push(makeItem("#"+item._id,"tag",item._id));
			});
		}

		//sites
		if ((this.props.filters.sites||[]).length>0){
			this.props.filters.sites.forEach((item,index)=>{
				items.push(makeItem(network.cleanDomain(item._id),"domain",network.cleanDomain(item._id)));
			});
		}

		return (
			<datalist id="searchAutoComplete">
				{items}
			</datalist>
		);
	}

	showContext(moreParams) {
    	var elem = ReactDom.findDOMNode(this.refs.searchInput);
    	var query = (this.state.word||"").trim();

    	var makeItem = (label, sublabel)=>{
    		return {label: label, sublabel: sublabel, click: ()=>{
    			elem.value = label;
    			elem.focus();
    			this.onSubmitForm();
    		}}
    	}

    	var items;

    	if ((this.props.filters.tags||[]).length>0)
	    	items = (this.props.filters.tags||[]).map((item)=>{
	    		return makeItem("#"+item._id, item.count)
	    	});

	    if ((this.props.filters.sites||[]).length>0){
			this.props.filters.sites.forEach((item,index)=>{
				items.push(makeItem(network.cleanDomain(item._id), item.count));
			});
		}

    	items = (items||[]).filter((item)=>{
    		return (item.label.toLowerCase().indexOf(query.toLowerCase())!=-1)
    	});

    	if ((items||[]).length==0)
    		return Pop.close();
    	
    	var pos = elem.getBoundingClientRect();
    	Pop.show("contextMenu", Object.assign({
    		mousePosition: {
	    		x: pos.left-18,
	    		y: pos.top+elem.clientHeight
	    	},
	    	force: "vertical",
	    	items: items,
	    	keyboard: true,
	    	onSelect: (label)=>this.setState({word:label})
	    },moreParams||{}))
    }

	renderForm() {
		var placeholder = this.props.placeholder;

		var items = [];
		/*if ((this.props.collection._id!=0)&&(this.props.open))
			items.push(
				<a className="keyword keyword-collection" key="keyword_collection" onClick={()=>this.props.submitSearch(this.props.query, "0")}><span className="icon"><CollectionIcon active={true} src={(this.props.collection.cover||[])[0]} _id={this.props.collection._id} size="16" /></span><span className="keywordLabel">{this.props.collection.title}</span><Icon className="close" name="close" size="micro" /></a>
			);*/

		_.forEach(this.props.query||[], (item,index)=>{
			var title = item.val, icon = null, clean = false;

			switch(item.key){
				case "type":
					clean = true;
					icon = <span className="icon"><Icon name={item.val} size="micro" /></span>;
					title = <span className="keywordLabel">{t.s(item.val+"s")}</span>;
				break;

				case "domain":
					clean = true;
					icon = <span className="icon"><FavIcon domain={item.val} className="domain-icon"/></span>;
					title = <span className="keywordLabel">{item.val}</span>;
				break;

				case "tag":
					clean = true;
					icon = <span className="icon"><Icon name="tag" size="micro" /></span>;
					title = <span className="keywordLabel">{item.val}</span>;
				break;

				case "notag":
					clean = true;
					icon = <span className="icon"><Icon name="tag" size="micro" /></span>;
					title = <span className="keywordLabel">{t.s('noTags')}</span>;
				break;

				case "important":
					clean = true;
					icon = <span className="icon"><Icon name="important" size="micro" /></span>;
					title = <span className="keywordLabel">{t.s("favoriteSites")}</span>;
				break;

				case "broken":
					clean = true;
					icon = <span className="icon"><Icon name="broken" size="micro" /></span>;
					title = <span className="keywordLabel">{t.s("broken")}</span>;
				break;

				case "best":
					clean = true;
					icon = <span className="icon"><Icon name="best" size="micro" /></span>;
					title = <span className="keywordLabel">{t.s("best")}</span>;
				break;
			}

			if (clean)
			items.push(
				<a className={"keyword keyword-"+item.key} data-index={items.length} key={"keyword"+index} onClick={()=>this.props.removeQuery(item.key, item.val)}>{icon}{title}<Icon className="close" name="close" size="micro" /></a>
			);
		});



		var icon;
		if (this.props.query.length==0)
			icon = <Icon name="search" className="searchMagnifier" />;
		else
			icon = <a onClick={this.handleCancel.bind(this)} className="clear"><Icon name="clear" className="searchMagnifier" /></a>;

		return (
			<form onSubmit={this.onSubmitForm.bind(this)}
				onReset={(e)=>{e.preventDefault();this.handleCancel()}}
				onMouseDown={this.bodyTouch.bind(this)}
				ref="keywords"
				className={"searchKeywords "+(this.props.query.length==0?"empty":"")}>
				{icon}
			{/*<Icon name="arrow" className="searchMagnifierArrow" />*/}

				<div className='searchKeywordsItems'>
					{items}
				</div>

				<input ref="searchInput"
						tabIndex="300"
						id={"search"+this.props.id||""}
						type="text"
						autoComplete="off"
						placeholder={placeholder}
						className="searchInput"
						value={this.state.word}
						onContextMenu={(e)=>{e.preventDefault();this.showContext()}}
						onChange={this.inputOnChange.bind(this)}
						onFocus={this.inputOnFocus.bind(this)}
						onBlur={this.inputOnBlur.bind(this)}
						onClick={this.onClick.bind(this)}
						onDoubleClick={this.onDoubleClick.bind(this)}
						onKeyDown={this.onInputKey.bind(this)} />
			</form>
		);
	}

	renderButton() {
		return (
			<div className="searchKeywords" onClick={this.inputOnFocus.bind(this)}>
				<span className="searchButton">
					<Icon name="search" className="searchMagnifier" />
					
					<span className="searchButtonTitle">{t.s("defaultCollection-0")}</span>
				</span>
			</div>
		);
	}

	render() {
		var className="search";
		if (this.props.open) {
			className += " open";
			if (this.state.focus) className += " focus";
		}
		if ((!this.props.open)&&(!this.state.focus)) className += " min";

		return (
			<div className={className}>
				<div className="searchKeywordsWrap">
					{this.renderForm()}
				</div>
			</div>
		);

		//						<span className="searchCancel"><a className="button min active" tabIndex="-1" onClick={this.handleCancel.bind(this)}>{t.s("cancel")}</a></span>

	}
}