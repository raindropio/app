import React from 'react'
import Icon from '~co/common/icon'

export default React.memo(
    function BookmarkItemTags({ tags=[] }) {
        if (!tags.length)
            return null

        return (
            <p>
                <span className='tags'>
                    {tags.map(tag=>
                        <a href='' key={tag}>
                            <Icon name='tag' size='micro' />
                            {tag}
                        </a>
                    )}
                </span>
            </p>
        )
    }
)