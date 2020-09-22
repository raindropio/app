import React from 'react'
import Bookmark from '~co/bookmarks/edit'

export default function AddContent(newOne) {
    return (
        <Bookmark 
            _id={newOne.item.link}
            
            new={newOne}

            autoFocus='title' />
    )
}