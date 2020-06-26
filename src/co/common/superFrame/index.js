import s from './index.module.styl'
import React from 'react'
import config from '~config'
import Preloader from '~co/common/preloader'

export let isNative = ('plugins' in document.createElement('webview'))

export default class SuperFrame extends React.Component {
	state = {
		status: 'loading'
	}

	componentDidUpdate(prev) {
		if (prev.src != this.props.src)
			this.setState({ status: 'loading' })
	}

	onLoad = ()=>
		this.setState({ status: 'loaded' })

	onError = ()=>
		this.setState({ status: 'error' })

	render() {
		const { src, disableSandbox=false, className='', ...etc } = this.props
		const { status } = this.state

		const Component = isNative ? 'webview' : 'iframe'

		return (
			<div {...etc} className={s.frame+' '+className} data-status={status}>
				<Component 
					tabIndex='-1' 
					allowtransparency='false'
					plugins='true'
					src={isNative || src.includes('raindrop.io') ? src : `${config.webPreview}${src}`} 
					sandbox={!disableSandbox && 'allow-same-origin allow-forms allow-scripts allow-popups'} 
					target='_self'
					onLoad={this.onLoad}
					onError={this.onError} />

				{status=='loading' ? <div className={s.overlay}><Preloader /></div> : null}
				{status=='error' ? <div className={s.overlay}>Error!</div> : null}
			</div>
		)
	}
}