/*
    <WebView 
        ref={ref} //gives HTMLIFrameElement or WebViewElement (electron)
        src="" />
*/
import s from './index.module.styl'
import React, { useRef, useState, useCallback, useEffect } from 'react'

import Browser from './browser'
import Electron, { isElectron } from './electron'
import Preloader from './preloader'
import ErrorLoading from './error'

function WebView({ forwardedRef, className='', ...etc }) {
    //ref
    const innerRef = useRef(null)

    //state
    const [status, setStatus] = useState('loading')

    //events
    useEffect(() => setStatus('loading'), [etc.src, setStatus])
    const onLoad = useCallback(() => setStatus('loaded'), [setStatus])
    const onError = useCallback(() => setStatus('error'), [setStatus])

    //component
    const Component = isElectron() ? Electron : Browser

    return (
        <div className={s.container+' '+className} data-status={status}>
            <Component 
                {...etc}
                className={s.webView}
                tabIndex='-1'
                forwardedRef={forwardedRef || innerRef}
                onLoad={onLoad}
                onError={onError} />

            <ErrorLoading 
                {...etc}
                className={s.error} />

            <Preloader 
                {...etc}
                className={s.preloader} />
        </div>
    )
}

export default React.forwardRef((props, ref) => {
    return <WebView {...props} forwardedRef={ref} />
})