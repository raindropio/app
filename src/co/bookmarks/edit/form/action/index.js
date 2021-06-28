import React from 'react'
import { Buttons } from '~co/common/form'
import Main from './main'

export default function BookmarkEditAction({ buttons, ...etc }) {
    return (
        <Buttons variant={buttons ? 'between' : undefined}>
            {buttons}
            <Main {...etc} />
        </Buttons>
    )
}