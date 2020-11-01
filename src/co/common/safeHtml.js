import React, { memo } from 'react'
import DOMPurify from 'dompurify'

function safe(content) {
    return {
        dangerouslySetInnerHTML: {
            __html: DOMPurify.sanitize(content, { ALLOWED_TAGS: ['em'], ALLOWED_ATTR: [] })
        }
    }
}

export default memo(
    function({ children='', tagName='div', ...etc }) {
        const Tag = tagName

        if (children.includes('<'))
            return (
                <Tag 
                    {...etc}
                    {...safe(children)} />
            )

        return <Tag {...etc}>{children}</Tag>
    }
)