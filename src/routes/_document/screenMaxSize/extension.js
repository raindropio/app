import React, { useState, useMemo } from 'react'
import { environment } from '~target'

export default function DocumentMaxSizeExtension() {
    const [zoom, setZoom] = useState(1)

    //only in chrome max width of window different when global zoom != 1
    useMemo(()=>{
        if (zoom != 1) return
        if (!environment.includes('chrome')) return

        function onResize() {
            if (document.documentElement.offsetWidth > window.innerWidth)
                setZoom(document.documentElement.offsetWidth / window.innerWidth)
        }
        
        onResize()
        
        window.addEventListener('resize', onResize)
        return ()=>window.removeEventListener('resize', onResize)
    }, [zoom])

    return <style>{`
        :root {
            --screen-max-width: ${parseInt(800/zoom)}px;
            --screen-max-height: ${parseInt(600/zoom)}px;
        }
    `}</style>
}