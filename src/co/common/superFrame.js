import React from 'react'
import ReactDom from 'react-dom'
import _ from 'lodash'

import config from '~config'
import Api from '~api'
import t from '~t'
import network from '~network'
import environment from '../../helpers/environment'

import Icon from '~icon'
import Preloader from '../../co/common/preloader'
import ElectronWebView from './electronWebView'

var pauseBeforeLoad = /*(environment.isDesktop() ? 0 :*/ 300/*)*/;

export default class SuperFrame extends React.Component {
	displayName = "common/superFrame"

	timer = null

	constructor(props) {
		super(props);
		this.state = {
			src: "",
			error: false,
			loading: true,
			screenshotLoaded: false
		}
	}

	checkFrameDeny(src) {
		if (src){
			if (window.location.protocol!=network.getProtocol(src))
				return this.setState({error:true, loading: false})

			Api.get("import/url/iframeable/?url="+src, (json)=>{
				if (!json.result)
					this.setState({error:true, loading: false})
			});
		}
	}

	componentDidMount() {
		this.loadSrc(this.props);
	}

	componentWillReceiveProps(nextProps) {
		clearTimeout(this.timer);
		if (this.state.src == nextProps.src) return;

		this.setState({error:false,src:"",loading: true, screenshotLoaded: false});

		this.loadSrc(nextProps);
	}

	loadSrc(props) {
		if (!environment.isDesktop() && !this.props.disableProxy)
			this.checkFrameDeny(props.src)

		this.timer = setTimeout(()=>{
			this.setState({src: props.src});
		}, pauseBeforeLoad);
	}

	onLoad(e,_this) {
		this.setState({loading:false});
	}

	onError(e,_this,errorCode,errorDescription) {
		this.setState({error: ((e||{}).errorCode ? 2 : 1),loading:false});
	}

	screenshotLoaded(e) {
		this.setState({screenshotLoaded:true});
	}

	render() {
		var content = null;
		var src = this.state.src;

		if (this.state.src)
			if (!this.state.error){
				if (environment.isDesktop())
					content = <ElectronWebView className={this.state.loading ? "loading" : null} id="readerPreview" src={this.state.src} onLoad={(e)=>this.onLoad(e,this)} onError={(e)=>this.onError(e,this)} />;
				else{
					var sandbox;
					if (typeof this.props.disableSandbox == "undefined")
						sandbox = "allow-same-origin allow-forms allow-scripts allow-popups";

					content = <iframe tabIndex="-" className={this.state.loading ? "loading" : null} id="readerPreview" allowTransparency={false} src={src} sandbox={sandbox} target="_self" onLoad={(e)=>this.onLoad(e,this)} onError={(e,errorCode,errorDescription)=>this.onError(e,this,errorCode,errorDescription)}></iframe>;
				}
			}
			else{
				var errorDesc = null;
				if (this.state.error == 1)
					errorDesc = <span>{_.capitalize(network.cleanDomain(this.props.domain))} {t.s("blockingFrame")}.&nbsp;</span>

				content = (
					<div 
						className="centerContent superFrame-error">
						<div>
							<h2 className="headLabel">{t.s("cantPreviewPage")}</h2>
							<p className="subHeadLabel">
								{errorDesc}<br />
								
								<a href='https://raindrop.io/download' className='button default' target='_blank'><Icon name='screenshot' size='micro' />&nbsp; {t.s('pro_desktop')}</a>
								<a href={this.state.src} className='button active' target="_blank"><Icon name='open' size='micro' />&nbsp; {t.s("openInBrowser")}</a>
							</p>

							<a tabIndex="-1" href={this.state.src} target="_blank" className="superFrame-screenshot-wrap">
								<img className="superFrame-screenshot" src={config.screenshotService+encodeURIComponent(this.state.src)+'&width=960'} width='' onLoad={this.screenshotLoaded.bind(this)} onError={this.screenshotLoaded.bind(this)} />
								{this.state.screenshotLoaded ? null : <Preloader />}
							</a>

							
						</div>
					</div>
				);
			}

		return (
			<div className={"centerContentWrap superFrame "+(this.state.loading ? "status-loading" : "")}>
				{this.props.children}
				{content}
				{this.state.loading ? <Preloader /> : null}
			</div>
		);
	}
}