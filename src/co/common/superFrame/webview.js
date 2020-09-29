import React from 'react'

export default class WebView extends React.Component {
    static defaultProps = {
        onLoad: undefined,
        onError: undefined
    }

    _webview = React.createRef()

    componentDidMount() {
        if (this._webview.current) {
            this._webview.current.addEventListener('did-finish-load', this.props.onLoad)
            this._webview.current.addEventListener('did-fail-load', this.props.onError)
            this._webview.current.addEventListener('new-window', this.onNewWindow)
        }
    }

    componentWillUnmount() {
        if (this._webview.current) {
            this._webview.current.removeEventListener('did-finish-load', this.props.onLoad)
            this._webview.current.removeEventListener('did-fail-load', this.props.onError)
            this._webview.current.removeEventListener('new-window', this.onNewWindow)
        }
    }

    onNewWindow = (e)=>{
        window.open(e.url)
    }

    render() {
        return (
            <webview 
                ref={this._webview}
                {...this.props} />
        )
    }
}