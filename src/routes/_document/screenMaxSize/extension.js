import React, { useState, useMemo } from 'react'
import browser from '~target/extension/browser'
import { environment } from '~target'

export default function DocumentMaxSizeExtension() {
    const [width, setWidth] = useState(800)
    const [height, setHeight] = useState(600)

    //only in chrome max width of window different when zoom != 1
    useMemo(()=>{
        if (!environment.includes('chrome')) return
        browser.tabs.getZoom().then(zoom=>{
            if (zoom == 1) return

            setWidth(800/zoom)
            setHeight(600/zoom)
        }).catch(e=>{})
    }, [])

    return <style>{`
        :root {
            --screen-max-width: ${width}px;
            --screen-max-height: ${height}px;
        }
    `}</style>
}