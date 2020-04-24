import React from 'react'
import ReactDom from 'react-dom'
import t from '~t'
import Icon from '~icon'
import config from '~config'
import _ from 'lodash'
import isURL from 'validator/es/lib/isURL'
import environment from '~modules/environment'
import Textarea from 'react-autosize-textarea'

import SuperImg from '../common/superImg'
import Pop from '~actions/pop'
import Preloader from '../common/preloader'
import Tags from '../bookmarks/edit/tags'
import DropFile from '~routes/collection/parts/dropFile'

import bookmarksHelpers from '~modules/bookmarks'

export default class URL extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			url: (environment.getClipboardLink()||{}).url||"",
			tags: []
		}
	}

	componentDidUpdate() {
		if (this.props.onUpdate)
        this.props.onUpdate();
    }

    handleSave(e) {
    	if (e)
        e.preventDefault();

        var _this = this;
        this.setState({loading: true});

        bookmarksHelpers.insertLink({url: this.state.url, tags: this.state.tags||[], edit: true}, (result)=>{
        	this.setState({loading: false});

        	if (result)
        		this.props.handleClose();
        });
    }

    handleFile(e) {
    	bookmarksHelpers.drop({
    		files: ReactDom.findDOMNode(this.refs.file).files
    	}, this.props.handleClose);
    }

    renderMore(valid) {
    	if (this.state.url)
    		return null;

    	return (
    		<div className="fieldsGroup">
    			<figure className="fieldWrap no-border">
					<label className="fieldName" htmlFor="bookmarkTags">
						{_.capitalize(t.s("or"))}
					</label>
				</figure>

				<section className="fieldLink">
					<div className="button active select">
						<span className="button-icon"><Icon name="upload" /></span>
						{t.s("upload")}&nbsp;{t.s("file").toLowerCase()}

						<input type="file" ref="file" onChange={this.handleFile.bind(this)} />
					</div>
				</section>

				<section className="fieldLink">
					<a className="button active" href="#/settings/import" onClick={(e)=>Pop.close()}><span className="button-icon"><Icon name="import" /></span>{t.s("importBookmarks")}&nbsp;{t.s("elements2")}</a>
				</section>

				<figure className="fieldWrap no-border">
					<label className="fieldName" htmlFor="bookmarkTags">
						{t.s("install")}
					</label>
				</figure>

				<section className="fieldLink">
					<a className="button active" href={config.links.download} target='_blank' onClick={(e)=>Pop.close()}><span className="button-icon"><Icon name="extension" /></span>{t.s("browserExtension")}</a>
				</section>

				<section className="fieldLink">
					<a className="button active" href={config.links.download} target='_blank' onClick={(e)=>Pop.close()}><span className="button-icon"><Icon name="mobile" /></span>{t.s("mobileApp")}</a>
				</section>
			</div>
    	);
    }

    renderFields(valid) {
    	if (!valid)
    		return null;

    	return (
    		<div className="fieldsGroup">
    			<figure className="fieldWrap">
					<label className="fieldName" htmlFor="bookmarkTags">
						{t.s("tags")} ({t.s("optional").toLowerCase()})
					</label>

					<Tags item={{tags: this.state.tags}} onChange={(tags)=>this.setState({tags:tags})}  />
				</figure>
    		</div>
    	);
    	//onEmptySubmit={this.handleSave.bind(this)}
	}
	
	renderSubmit(valid) {
		return (
			<div className='fieldWrap no-border'>
				<div className='field'>
				<input
					type='submit'
					className={'button standart loginButton input '+(valid?'blue':'default')}
					value={t.s('save')} />
					</div>
			</div>
		)
	}

	render() {
		if (this.state.loading)
			return (<form className="superForm">
				<div className="centerContentWrap desktop-behavior"><div className="centerContent"><Preloader /></div></div>
			</form>);

		var validURL = (isURL(this.state.url, {require_tld: false, require_valid_protocol: false}));
		if (!(this.state.url||"").includes('.')) validURL = false;

		return (
			<DropFile onDropStart={this.props.handleClose}><div className="superForm urlPanel">
				<br/>
				<div className="promo">
					{/*<SuperImg src="empty/no_items.png" width="149" height="128" />*/}
					<SuperImg src="marketing/newUrl.png" width="510" height="230"/>
				</div>

				<form className="urlWrap" onSubmit={this.handleSave.bind(this)}>
					<div className="fieldWrap urlWrap">
						<label className="fieldName urlLabel" htmlFor="publicLink">{t.s("enterLinkDescription").replace(/\./g,'')} {t.s("dropFilesHere").toLowerCase()}.</label>
						<Textarea type="text"
								id="publicLink"
								className="field title urlField"
								value={this.state.url}
								autoComplete="off"
								onChange={(e)=>this.setState({url: e.target.value})}
								placeholder={t.s("link")}
								required
								autoFocus
								onKeyDown={(e)=>{if(e.keyCode==13)this.handleSave(e)}} />
					</div>
					
					{this.renderFields(validURL)}
					{this.renderSubmit(validURL)}
				</form>
				
				{this.renderMore(validURL)}
				
			</div></DropFile>
		);
	}
}