import React, { useMemo } from 'react'
import { PREVIEW_URL } from '~data/constants/app'

const done = new Set()

export default function BookmarkItemPreload({ type, link, _id }) {
    const href = useMemo(()=>{
        if (type == 'link') return
        if (done.has(_id)) return
        done.add(_id)
        return `${PREVIEW_URL}/${type == 'article' ? 'article' : 'embed'}/${btoa(link)}`
    }, [type, link])

    if (!href)
        return null

    return (
        <link rel='prefetch' as='document' href={href} />
    )
}