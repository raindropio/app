import React from 'react'
import t from '~t'
import _ from 'lodash-es'

import { Label } from '~co/common/form'
import TagsField from '~co/tags/field'

export default function BookmarkEditFormTags({ tags, setTags, collectionId, loading }) {
    return (
        <>
            <Label>{_.capitalize(t.s('with'))} {t.s('tags').toLowerCase()}</Label>
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