import React, { memo } from 'react'
import DOMPurify from 'dompurify'

function safe(html) {
    return {
        dangerouslySetInnerHTML: {
            __html: DOMPurify.sanitize(html, { ALLOWED_TAGS: ['em'], ALLOWED_ATTR: [] })
        }
    }
}

export default memo(
    function({ html='', tagName='div', ...etc }) {
        const Tag = tagName

        if (html.includes('<'))
            return (
                <Tag 
                    {...etc}
                    {...safe(html)} />
            )

        return <Tag {...etc}>{html}</Tag>
    }
)