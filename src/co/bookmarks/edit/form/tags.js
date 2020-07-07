import React from 'react'
import t from '~t'

import { Label } from '~co/common/form'
import TagsPicker from '~co/picker/tags/field'

class BookmarkEditFormTags extends React.Component {
    onChange = (tags)=>{
        this.props.onChange({ tags })
    }

    render() {
        const { autoFocus, item: { _id, tags, collectionId }, onSubmit } = this.props

        return (
            <>
                <Label>{t.s('tags')}</Label>
                <TagsPicker 
                    value={tags}
                    bookmarkId={_id}
                    collectionId={collectionId}
                    
                    autoFocus={autoFocus=='tags'}
                    onChange={this.onChange}
                    onBlur={onSubmit} />
            </>
        )
    }
}

export default BookmarkEditFormTags