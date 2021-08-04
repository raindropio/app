import { useState, useEffect } from 'react'

export default function useAutoSize(ref) {
    const [style, setStyle] = useState(undefined)

    useEffect(()=>{
        const onResize = function([{ contentRect: { width, height } }]) {
            if (!ref || !ref.current) return

            setStyle({
                width: width+'px', 
                height: height+'px'
            })
        }

        const ro = ('ResizeObserver' in window) ? new ResizeObserver(onResize) : null

        const onLoad = function(e) {
            if (!ro) return
            const body = e.target.contentWindow.document.body
            ro.observe(body)

            //firefox fix for initial load
            setTimeout(()=>{
                onResize([{ contentRect: {
                    width: body.offsetWidth,
                    height: body.offsetHeight
                } }])
            }, 1)
        }

        if (ref && ref.current)
            ref.current.addEventListener('load', onLoad)

        return ()=>{
            if (!ref || !ref.current) return
            ref.current.removeEventListener('load', onLoad)
        }
    }, [ref])

    return style
}