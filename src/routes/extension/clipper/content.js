import React from 'react'
import Bookmark from '~co/bookmarks/edit'

export default function ClipperContent({ item }) {
    return (
        <Bookmark 
            _id={item.link}
            
            new={{
                item,
                //preventDuplicate: false,
                autoCreate: false
            }}

            autoFocus='title' />
    )
}