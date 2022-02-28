import { useEffect, useCallback } from 'react'

/*
    useMessage(ref, (type, payload)=>{}, [])
*/
export function useMessageEffect(ref, onMessage, deps=[]) {
    useEffect(()=>{
        if (ref.current instanceof window.HTMLIFrameElement) {
            function listener({ data, source }) {
                if (typeof data != 'object' || typeof data.type != 'string') return
                if (!ref.current || source != ref.current.contentWindow) return
                onMessage(data.type, data.payload)
            }
            window.addEventListener('message', listener)

            return ()=>
                window.removeEventListener('message', listener)
        }
        else if (ref.current && ref.current.tagName == 'WEBVIEW') {
            function listener({ channel, args=[] }) {
                if (channel != 'RDH') return
                if (args.length && typeof args[0] != 'object' || typeof args[0].type != 'string') return
                onMessage(args[0].type, args[0].payload)
            }
            ref.current.addEventListener('ipc-message', listener)

            return ()=>{
                if (!ref.current) return
                ref.current.removeEventListener('ipc-message', listener)
            }
        }
        
        return ()=>{}
    }, [ref, ...deps])
}

export function send(element, type, payload) {
    if (!element) return
    if (
        element instanceof window.HTMLIFrameElement && 
        element.contentWindow
    )
        element.contentWindow.postMessage({ type, payload }, '*')
    else if (element && element.tagName == 'WEBVIEW')
        element.send('RDH', { type, payload })
}

/*
    const send = useSend(ref)
    send('some_type', {payload...})
*/
export function useSendCallback(ref) {
    return useCallback((type, payload) => send(ref.current, type, payload), [ref])
}