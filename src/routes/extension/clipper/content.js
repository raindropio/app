import React from 'react'
import { connect } from 'react-redux'
import Bookmark from '~co/bookmarks/edit'
import Buttons from './buttons'

function ClipperContent({ item, add_auto_save, add_default_collection, last_collection }) {
    const collectionId = add_default_collection||last_collection

    return (
        <Bookmark 
            _id={item.link}
            
            new={{
                item: { 
                    ...item,
                    collectionId
                },
                //preventDuplicate: false,
                autoCreate: add_auto_save
            }}

            autoFocus='title'
            autoWindowClose
            
            buttons={
                <Buttons
                    collectionId={collectionId} />
            } />
    )
}

export default connect(
    ({ config: { add_auto_save, add_default_collection, last_collection } })=>({
        add_auto_save,
        add_default_collection,
        last_collection
    })
)(ClipperContent)