import React, { memo } from 'react'

const unsafeTagsTest = /<[^/?em]/m

export default memo(
    function({ children='', tagName='div', ...etc }) {
        const Tag = tagName

        if (children.includes('<')){
            if (unsafeTagsTest.test(children))
                return null

            return (
                <Tag 
                    {...etc}
                    dangerouslySetInnerHTML={{ __html: children }} />
            )
        }

        return <Tag {...etc}>{children}</Tag>
    }
)