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

        //resize observer
        const ro = ('ResizeObserver' in window) ? new ResizeObserver(onResize) : null

        //additional observer, need for firefox only until bug is fixed https://bugzilla.mozilla.org/show_bug.cgi?id=1689099
        let mot
        const onMo = function() {
            if (!ref || !ref.current) return
            onResize([{ contentRect: {
                width: ref.current.contentWindow.document.body.offsetWidth, 
                height: ref.current.contentWindow.document.body.offsetHeight
            }}])
        }
        const mo = ('MutationObserver' in window && 'MozAppearance' in document.documentElement.style) ? 
            new MutationObserver(()=>{
                onMo()
                clearTimeout(mot)
                mot = setTimeout(onMo, 100)
            }) : null
        //-----------------------------------------

        const onLoad = function(e) {
            if (!ro) return
            const body = e.target.contentWindow.document.body

            ro.observe(body)
            if (mo) mo.observe(body, { subtree: true, childList: true })
        }

        if (ref && ref.current)
            ref.current.addEventListener('load', onLoad)

        return ()=>{
            if (!ref || !ref.current) return
            if (ro) ro.unobserve(ref.current.contentWindow.document.body)
            if (mo) mo.unobserve(ref.current.contentWindow.document.body)
            ref.current.removeEventListener('load', onLoad)
        }
    }, [ref])

    return style
}