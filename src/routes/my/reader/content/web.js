import s from './web.module.styl'
import React, { useRef } from 'react'
import WebView from '~co/common/webview'

export default function ReaderWeb({ item: { link } }) {
	const webViewRef = useRef(null)

    return (
		<WebView 
			ref={webViewRef}
			className={s.web} 
			src={link} />
	)
}