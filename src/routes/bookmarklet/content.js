import React from 'react'
import Bookmark from '~co/bookmarks/edit'

export default function BookmarkletContent({ url, title='' }) {
    return (
        <Bookmark 
            _id={url}
            
            new={{
                item: {
                    title
                },
                autoCreate: false
            }}

            autoFocus='title' />
    )
}