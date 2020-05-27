import React from 'react'
import config from '~config'
import Preloader from '~co/common/preloader'

export let isNative = ('plugins' in document.createElement('webview'))

export default class SuperFrame extends React.Component {
	state = {
		loading: true
	}

	componentDidUpdate(prev) {
		if (prev.src != this.props.src)
			this.setState({ loading: true })
	}

	onLoad = ()=>
		this.setState({ loading: false })

	onError = ()=>
		this.setState({ loading: false })

	render() {
		const { src, disableSandbox=false } = this.props
		const { loading } = this.state

		const Component = isNative ? 'webview' : 'iframe'

		return (
			<div className={`superFrame ${loading && 'status-loading'}`}>
				<Component 
					tabIndex='-1' 
					allowtransparency='false'
					plugins='true'
					src={isNative ? src : `${config.webPreview}${src}`} 
					sandbox={!disableSandbox && 'allow-same-origin allow-forms allow-scripts allow-popups'} 
					target='_self'
					onLoad={this.onLoad}
					onError={this.onError} />

				{loading ? <div className='superFrame-loading'><Preloader /></div> : null}
			</div>
		)
	}
}