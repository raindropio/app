import React from 'react'
import Bookmark from '~co/bookmarks/edit'

export default function AddContent({ item, autoCreate }) {
    return (
        <Bookmark 
            _id={item.link}
            
            new={{ item, autoCreate }}

            autoFocus='title' />
    )
}