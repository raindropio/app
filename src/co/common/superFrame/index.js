import s from './index.module.styl'
import React from 'react'
import t from '~t'
import Preloader from '~co/common/preloader'
import Icon from '~co/common/icon'
import Iframe from './iframe'
import WebView from './webview'
import { getDomain } from '~modules/format/url'
import links from '~config/links'

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

		const Component = isNative ? WebView : Iframe
		const sandbox = !isNative && !src.includes('raindrop.io') && !src.includes('localhost')

		return (
			<div {...etc} className={s.frame+' '+className} data-status={status} data-theme='day'>
				{src ? (
					<Component 
						tabIndex='-1' 
						allowtransparency='false'
						plugins='true'
						src={src} 
						sandbox={sandbox ? 'allow-scripts allow-popups allow-same-origin' : undefined}
						target='_self'
						onLoad={this.onLoad}
						onError={this.onError} />
				) : null}

				{status=='loading' || !src ? <div className={s.overlay+' '+s.nonclickable}><Preloader enlarge='1.5' /></div> : null}

				{status=='error' ? (
					<div className={s.overlay}>
						<Icon name='hide' enlarge='2' />
						<h3>{t.s('preview')} {t.s('error').toLowerCase()}</h3>
						<div>
							<b>{getDomain(src)}</b> probably blocks site preview.
						</div>
						<div>
							To be able to preview any site, <a href={links.download} target='_blank'>install our desktop app</a>.
						</div>
					</div>
				) : null}
			</div>
		)
	}
}