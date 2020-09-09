import React from 'react'
import Bookmark from '~co/bookmarks/edit'

export default function BookmarkletContent({ link, title='' }) {
    return (
        <Bookmark 
            _id={link}
            
            new={{
                item: {
                    title
                },
                autoCreate: false
            }}

            autoFocus='title' />
    )
}