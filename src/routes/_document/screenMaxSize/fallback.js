import React from 'react'

export default function DocumentMaxSizeFallback() {
    return <style>{`
        :root {
            --screen-max-width: 100vw;
            --screen-max-height: 100vh;
        }
    `}</style>
}