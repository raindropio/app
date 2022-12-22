import React from 'react'
import t from '~t'

import { SubLabel } from '~co/common/form'
import { ShortDateTime } from '~modules/format/date'

export default function BookmarkEditFormDate({ item: { created } }) {
    if (!created)
        return null

    return (
        <>
            <div/>
            <SubLabel>{t.s('saved')} <ShortDateTime date={created}/></SubLabel>
        </>
    )
}