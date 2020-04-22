import React from 'react'
import ReactDom from 'react-dom'

export default class ElectronWebView extends React.Component {
	displayName = "common/ElectronWebView"

	componentDidMount() {
		var webViewElem = ReactDom.findDOMNode(this.refs.webview);

		if (webViewElem){
			if (this.props.onLoad)
				ReactDom.findDOMNode(this.refs.webview).addEventListener('dom-ready', this.props.onLoad);

			/*if (this.props.onError){
				ReactDom.findDOMNode(this.refs.webview).addEventListener('did-fail-load', this.props.onError);
				ReactDom.findDOMNode(this.refs.webview).addEventListener('crashed', this.props.onError);
			}*/
		}
	}

	componentWillUnmount() {
		var webViewElem = ReactDom.findDOMNode(this.refs.webview);

		if (webViewElem){
			if (this.props.onLoad)
				ReactDom.findDOMNode(this.refs.webview).removeEventListener('dom-ready', this.props.onLoad);

			/*if (this.props.onError){
				ReactDom.findDOMNode(this.refs.webview).removeEventListener('did-fail-load', this.props.onError);
				ReactDom.findDOMNode(this.refs.webview).removeEventListener('crashed', this.props.onError);
			}*/
		}
	}

	render() {
		return <webview tabIndex="-1" ref="webview" plugins="true" {...this.props} />;
	}
}