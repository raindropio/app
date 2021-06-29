import React from 'react'
import t from '~t'

import { Label } from '~co/common/form'
import TagsField from '~co/tags/field'

export default function BookmarkEditFormTags({ tags, setTags, collectionId, loading }) {
    return (
        <>
            <Label>{t.s('tags')}</Label>
            <div>
                <TagsField 
                    disabled={loading}
                    value={tags}
                    spaceId={collectionId}
                    onChange={setTags} />
            </div>
        </>
    )
}