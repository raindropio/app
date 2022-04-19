import s from './web.module.styl'
import React from 'react'
import WebView from '~co/common/webview'
import useWithWebView from '~co/highlights/useWithWebView'

export default function PageMyItemTabWeb({ item: { _id, link }, webViewRef }) {
	useWithWebView(webViewRef, _id)

    return (
		<WebView 
			ref={webViewRef}
			className={s.web} 
			src={link} />
	)
}