import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { load } from '~data/actions/tags'

import { Label } from '~co/common/form'
import TagsPicker from '~co/picker/tags'

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

export default connect(
	undefined,
	{ load }
)(BookmarkEditFormTags)