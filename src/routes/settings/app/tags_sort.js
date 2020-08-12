import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { reorder } from '~data/actions/tags'

import { Label, Radio } from '~co/common/form'

function SettingsAppTagsSort({ tags_sort, reorder }) {
    return (
        <>
            <Label>{t.s('tags')} {t.s('sortBy').toLowerCase()}</Label>
            <div>
                {[
                    ['_id', t.s('byName')],
                    ['-count', t.s('byBookmarksCount')]
                ].map(([key, label])=>
                    <Radio 
                        key={key}
                        name='tags_sort'
                        checked={tags_sort==key}
                        onChange={e=>reorder(key)}>
                        {label}
                    </Radio>
                )}
            </div>
        </>
    )
}

export default connect(
    state=>({
        tags_sort: state.config.tags_sort
    }),
    { reorder }
)(SettingsAppTagsSort)