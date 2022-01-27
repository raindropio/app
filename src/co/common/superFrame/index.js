import s from './index.module.styl'
import React from 'react'
import t from '~t'
import Preloader from '~co/common/preloader'
import Icon from '~co/common/icon'
import Iframe from './iframe'
import WebView from './webview'
import { getDomain } from '~modules/format/url'
import getScreenshotUri from '~data/modules/format/screenshot'
import links from '~config/links'

export function isNative() {
	return ('plugins' in document.createElement('webview'))
}

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

		const Component = isNative() ? WebView : Iframe
		const sandbox = !isNative() && !src.includes('raindrop.io') && !src.includes('localhost')

		return (
			<div {...etc} className={s.frame+' '+className} data-status={status}>
				<Component 
					hidden={status=='error'}
					data-theme='day'
					tabIndex='-1' 
					allowtransparency='false'
					plugins='true'
					src={src} 
					sandbox={sandbox ? 'allow-scripts allow-popups allow-same-origin' : undefined}
					target='_self'
					onLoad={this.onLoad}
					onError={this.onError} />

				<div className={s.overlay} hidden={status!='error'}>
					<a 
						href={src} 
						target='_blank' 
						className={s.screenshot}>
						<img src={getScreenshotUri(src)+'?format=webp'} loading='eager' />
					</a>

					<Icon name='hide' enlarge='2' />
					<h3>{t.s('preview')} {t.s('error').toLowerCase()}</h3>
					<div>
						<b>{getDomain(src)}</b> probably blocks site preview.
					</div>
					<div>
						To be able to preview any site, <a href={links.download} target='_blank'>install our desktop app</a>.
					</div>
				</div>

				{status=='loading' || !src ? <div className={s.overlay+' '+s.nonclickable} data-theme='day'><Preloader enlarge='1.5' /></div> : null}
			</div>
		)
	}
}