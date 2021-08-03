import s from './index.module.styl'
import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import Iframe from '../iframe'
import useSafeClose from './useSafeClose'

export default function App() {
    //params
    const { mode } = useMemo(()=>Object.fromEntries(new URLSearchParams(location.search)), [])
    const [ status, setStatus ] = useState('init') //init, loading, ready, closing
    useEffect(()=>setStatus('loading'), [])

    //frame
    const frame = useRef(null)

    //events
    const safeToClose = useSafeClose(frame)
    const onLoad = useCallback(()=>setStatus('ready'), [])
    const onClose = useCallback(()=>{
        if (status == 'closing') return

        if (safeToClose()){
            setStatus('closing')

            setTimeout(() => (
                window.parent.postMessage({ action: 'close' }, '*')
            ), 200)
        }
    }, [status, safeToClose])

    return (
        <div 
            className={s.app}
            data-mode={mode}
            data-status={status}>
            <Iframe
                ref={frame}
                mode={mode}
                status={status}
                onLoad={onLoad}
                onClose={onClose} />

            <div 
                className={s.backdrop}
                onClick={onClose}
                onContextMenu={e=>{e.preventDefault()}} />
        </div>
    )
}