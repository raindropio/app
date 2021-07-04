import s from './index.module.styl'
import React from 'react'
import config from '~config'
import Preloader from '~co/common/preloader'
import WebView from './webview'

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
		const { src, className='', ...etc } = this.props
		const { status } = this.state

		const Component = isNative ? WebView : 'iframe'
		const sandbox = !isNative && !src.includes('raindrop.io') && !src.includes('localhost')

		return (
			<div {...etc} className={s.frame+' '+className} data-status={status} data-theme='day'>
				{src ? (
					<Component 
						tabIndex='-1' 
						allowtransparency='false'
						plugins='true'
						src={sandbox ? `${config.links.webPreview}${src}` : src} 
						sandbox={sandbox ? 'allow-scripts allow-popups allow-same-origin' : undefined}
						target='_self'
						onLoad={this.onLoad}
						onError={this.onError} />
				) : null}

				{status=='loading' || !src ? <div className={s.overlay}><Preloader enlarge='1.5' /></div> : null}
				{status=='error' ? <div className={s.overlay}>Error!</div> : null}
			</div>
		)
	}
}