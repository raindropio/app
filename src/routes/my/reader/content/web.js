import s from './web.module.styl'
import React, { useRef } from 'react'
import WebView from '~co/common/webview'
import useWithWebView from '~co/bookmarks/highlights/useWithWebView'

export default function ReaderWeb({ item: { _id, link } }) {
	const webViewRef = useRef(null)
	useWithWebView(webViewRef, _id)

    return (
		<WebView 
			ref={webViewRef}
			className={s.web} 
			src={link} />
	)
}