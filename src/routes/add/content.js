import React from 'react'
import Bookmark from '~co/bookmarks/edit'

export default function AddContent({ item }) {
    return (
        <Bookmark 
            _id={item.link}
            
            new={{ item, autoCreate: false }}

            autoFocus='title'
            autoWindowClose />
    )
}