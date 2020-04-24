import React from 'react'
import ReactDom from 'react-dom'
import t from '~t'
import config from '~config'
import environment from '~modules/environment'
import { capturePage } from '~modules/clipper'
import Icon from '~icon'
import Api from '~api'
import debounce from 'lodash/debounce'

import bookmarksActions from '~actions/bookmarks'
import Pop from '~actions/pop'

import Bookmark from '~routes/collection/reader/bookmark';
import Textarea from 'react-autosize-textarea'
import Cover from '~co/bookmarks/item/cover'
import Tags from './tags'
import _ from 'lodash'

class Edit extends React.Component {
	displayName = "reader/edit"

	constructor(props) {
		super(props);

		this.state = {
			item: props.item||{}
		}

		this.changeField = this.changeField.bind(this)
		this.saveField = debounce(this.saveField, 250).bind(this)
		this.blurField = this.blurField.bind(this)
	}

	componentDidMount() {
		if (this.props.autoFocus=="description"){
			try{
				var input = ReactDom.findDOMNode(this.refs.description.refs.textarea);
				input.setSelectionRange(0, input.value.length);
			}catch(e){}
		}

		this.getSuggestions(this.props)
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		var item = nextProps.item||{};

		if (this.state.item && (this.state.item._id != item._id ||
			this.state.item.media != item.media ||
			this.state.item.cover != item.cover)){
			this.getSuggestions(nextProps);
			this.setState({item: item, suggestedTags:undefined});

			/*clearTimeout(this.focusTimeout);
			this.focusTimeout = setTimeout(()=>{
				ReactDom.findDOMNode(this.refs.title).focus();
			},300);*/
		}
	}

	getSuggestions(props) {
		if (props.item && typeof props.suggestedTags == "undefined")
			Api.post('keywords', {text: props.item.title+". "+props.item.excerpt, domain:props.item.domain}, (json)=>{
				this.setState({suggestedTags: json.tags});
			})
	}

	updateKeyVal(key,val) {
		var obj = {};
		obj[key] = val;

		var needToSave = true;
		if ((typeof val == "string")||(typeof val == "number"))
			needToSave = (this.state.item[key].trim() != val.trim());

		if (needToSave) {
			clearTimeout(this.saveTimeout);

			this.saveTimeout = setTimeout(()=>{
				var update = {};
				update[key] = this.state.item[key];
				if (typeof update[key] == "string")
					update[key] = update[key]//.trim();

				bookmarksActions.updateBookmark({
					item: Object.assign({_id: this.state.item._id}, update),
					silent: true
				}, function(result){});
			}, 100);
		}

		this.setState({
			item: Object.assign(this.state.item, obj)
		});
	}

	changeField(e) {
		var key = e.target.getAttribute('name'),
			val = e.target.value;

		var obj = {};
		obj[key] = val;
		
		if (key == 'url')
			obj.link = val;

		this.saveField(key,val)
		this.setState({
			item: Object.assign(this.state.item, obj)
		})
	}

	saveField(key,val) {
		var update = {};
			update[key] = val;

		bookmarksActions.updateBookmark({
			item: Object.assign({_id: this.state.item._id}, update),
			silent: true
		}, function(result){});
	}

	blurField(e) {
		var key = e.target.getAttribute('name'),
			val = e.target.value;

		this.saveField(key,val)
	}

	onTagsChange(tags) {
		this.updateKeyVal("tags", tags||[]);
	}

	submit(e) {
		e.preventDefault();
	}

	handleChangeCover(index) {
		var obj = {
			cover: index,
			coverId: index,
			coverEnabled: true,
			media: this.state.item.media
		}

		bookmarksActions.updateBookmark({
			item: Object.assign({_id: this.state.item._id}, obj),
			silent: true
		}, function(result){});

		this.setState({
			item: Object.assign(this.state.item, obj)
		});
	}

	addCover(obj) {
		this.state.item.media.unshift(obj);
		this.handleChangeCover(0);
	}

	addScreenshot() {
		new Promise((res, rej)=>{
			if (!environment.isClipper())
				return rej('not clipper')

			try{
				capturePage(this.state.item.link, (dataURI)=>{
					if (dataURI)
						return res(dataURI)
					rej('cant capture')
				})
			} catch(e) {
				return rej(e)
			}
		})
		.then(dataURI=>fetch(dataURI))
		.then(res=>res.arrayBuffer())
		.then(buf=>new File([buf], `${new Date().getTime()}.jpg`, {type:'image/jpeg'}))
		.then(file=>{
			bookmarksActions.uploadCover({
				_id: this.state.item._id,
				file
			})
		})
		.catch(e=>{
			console.log(e)
			this.serverScreenshot()
		})
	}

	serverScreenshot() {
		this.addCover({link: config.screenshotService+encodeURIComponent(this.state.item.link), type: "image", screenshot: true})
	}

	onClickSelectCover = ()=>{
		Pop.show('newCover', {
			pin: "selectIcon", force:"vertical", onSelect: this.afterSelectCover})
	}

	afterSelectCover = (type, value, callback)=>{
		switch(type) {
			case 'link':
				this.addCover({
					link: value
				})
				callback(true)
			break

			case 'file':
				bookmarksActions.uploadCover({
					_id: this.state.item._id,
					file: value
				}, (result)=>{
					this.setState({item: this.props.item})
					callback(result)
				})
			break
		}
	}

	renderAdvice() {
		if (this.props.embeded) return null;

		return (<div className="bookmarkEdit bookmarkEditAdvice"><div className="superForm">
			<figure className="fieldWrap no-border">
				<label className="fieldName"><b>{t.s("advice")}</b></label>

				<label className="fieldName" style={{paddingTop:"10px"}}>{t.s("dragNdropD")}</label>
				<label className="fieldName" style={{paddingTop:"10px"}}>{t.s("helpContextD")}</label>
				<br />
			</figure>
		</div></div>);
	}

	renderCoverSlider() {
		var src="", count = 0;
		try{src=this.state.item.media[this.state.item.coverId].link; count = this.state.item.media.length;}catch(e){}

		var back = ()=>{
			var i = (this.state.item.coverId - 1);
			if (i<0) i = this.state.item.media.length-1;
			this.handleChangeCover(i);
		}
		var next = ()=>{
			var i = (this.state.item.coverId + 1);
			if (i>this.state.item.media.length-1) i = 0;
			this.handleChangeCover(i);
		}

		//if (!count) return null;

		return (
			<div className="bookmarkEditCover">
				<div className="actions">
					<a className="button default min" title={t.s("more")+" "+t.s("icon").toLowerCase()} id="selectIcon" onClick={this.onClickSelectCover}><b><Icon name="settings" /></b></a>
					<a className={"button default min "+(count<=1 ? "hidden" : "")} onClick={back}><b><Icon name="back" /></b></a>
					<a className={"button default min "+(count<=1 ? "hidden" : "")} onClick={next}><b><Icon name="next" /></b></a>
				</div>

				<Cover src={src}
					link={this.state.item.link}
					domain={this.state.item.domain}
					disableThumb={false} />
			</div>
		);
	}

	render() {
		/*if (this.props.status=="loading")
			return (
				<div className="preview">
					<div className="centerContentWrap status-loading"><Preloader /></div>
				</div>
			);*/
		var haveScreenshot = false;
        try{haveScreenshot = (_.findIndex(this.state.item.media||[], {screenshot: true})!=-1);}catch(e) {}

		return (<div className="bookmarkEditWrap">
			<div className="bookmarkEdit editTagsWrap"><div className="superForm">
				<figure className="fieldWrap">
					<Tags item={this.state.item}
						  suggestedTags={this.state.suggestedTags||this.props.suggestedTags}
						  autoFocus={this.props.autoFocus=="tags"}
						  onChange={this.onTagsChange.bind(this)} />
				</figure>
			</div></div>
			
			<div className="bookmarkEdit">
				<form className="superForm" onSubmit={this.submit.bind(this)}>
					<div className="fieldWrap">
						<label className="fieldName" htmlFor="bookmarkTitle">{t.s("title")}</label>

						<Textarea type="text"
								ref="title"
								id="bookmarkTitle"
								className="field title"
								required={true}
								autoComplete="off"
								autoFocus={!this.props.autoFocus}
								name="title"
								placeholder={t.s(this.props.loading ? "" : "title")}
								defaultValue={this.state.item.title}
								onChange={this.changeField}
								onBlur={this.blurField}
								onKeyDown={(e)=>{if(e.keyCode==13)this.submit(e)}}/>
					</div>

					<div className="fieldWrap">
						<label className="fieldName" htmlFor="bookmarkExcerpt">{t.s("description")}</label>

						<Textarea type="text"
								ref="description"
								id="bookmarkExcerpt"
								className="field"
								autoComplete="off"
								autoFocus={this.props.autoFocus=="description"}
								name="excerpt"
								placeholder={/*this.props.loading ?*/ "" /*: t.s("description")*/}
								defaultValue={this.state.item.excerpt}
								onChange={this.changeField}
								onBlur={this.blurField}
								onKeyDown={(e)=>{if(e.keyCode==13)this.submit(e)}} />
					</div>

					<div className="fieldWrap">
						<label className="fieldName" htmlFor="bookmarkURL">URL</label>

						<Textarea type="url" 
							id="bookmarkURL" 
							className="field"
							name="url"
							defaultValue={this.state.item.link}
							onChange={this.changeField}
							onBlur={this.blurField}
							onKeyDown={(e)=>{if(e.keyCode==13)this.submit(e)}}
							/>
					</div>

					<section className={"fieldLink "+(haveScreenshot?"hidden":"")}>
						<a className="button min active" onClick={this.addScreenshot.bind(this)}>{t.s("clickToMakeScreenshot")}</a>
					</section>

					{/*<figure className="fieldWrap">
						<label className="fieldName">{t.s("selectPreferedType")}</label>
						
						<label className="selectBlank selectButton inline no-icon">
							
							<span className="caption">{t.s(this.state.item.type)}</span>
							<Icon className="fieldIcon arrow" name="arrow" />

							<select ref="lang" value={this.state.item.type} name="type" onChange={this.changeField.bind(this)}>
								<option value="link">{t.s("link")}</option>
								<option value="article">{t.s("article")}</option>
								<option value="image">{t.s("image")}</option>
								<option value="video">{t.s("video")}</option>
							</select>
						</label>

						<Icon name={this.state.item.type} size="micro" className="fieldTypeIcon themeColor" />
					</figure>*/}
				</form>
			</div>

			

			<div className="bookmarkEdit inline bookmarkEditCoverWrap">
				{this.renderCoverSlider()}
			</div>

			{this.renderAdvice()}
		</div>);
	}
}

export default Bookmark(Edit)