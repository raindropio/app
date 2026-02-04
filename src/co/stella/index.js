import s from './index.module.styl'
import React from 'react'
import { STELLA_URL } from '~data/constants/app'

export default function Stella({ raindropId, className, ...props }) {
    return (
        <iframe
            {...props}
            src={STELLA_URL + (raindropId ? `?raindropId=${raindropId}` : '')}
            allow='fullscreen; clipboard-write'
            loading='eager'
            className={className || s.frame}
        />
    )
}

export function PreloadStella() {
    return <link rel='prefetch' crossOrigin='use-credentials' href={STELLA_URL} />
}
