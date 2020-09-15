import React from 'react'
import { connect } from 'react-redux'
import Bookmark from '~co/bookmarks/edit'

function ClipperContent({ item, add_auto_save }) {
    return (
        <Bookmark 
            _id={item.link}
            
            new={{
                item,
                //preventDuplicate: false,
                autoCreate: add_auto_save
            }}

            autoFocus='title' />
    )
}

export default connect(
    ({ config: { add_auto_save } })=>({
        add_auto_save
    })
)(ClipperContent)