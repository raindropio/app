import React, { memo } from 'react'
import DOMPurify from 'dompurify'
import { marked } from 'marked'

function safe(html) {
    return {
        dangerouslySetInnerHTML: {
            __html: DOMPurify.sanitize(
                marked.parseInline(html, { silent: true }),
                {
                    ALLOWED_TAGS: ['i', 'b', 'strong', 'ul', 'ol', 'li', 'pre', 'code', 'em', 'blockquote', 'a']
                }
            )
        }
    }
}

export default memo(
    function({ markdown='', tagName='div', ...etc }) {
        const Tag = tagName

        return (
            <Tag 
                {...etc}
                {...safe(markdown)} />
        )
    }
)