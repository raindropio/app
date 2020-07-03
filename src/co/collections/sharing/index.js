import s from './index.module.styl'
import React from 'react'

import Popover from '~co/overlay/popover'
import Title from './title'
import Public from './public'
import Collaborators from './collaborators'
import Invite from './invite'

export default function CollectionSharingView({ pin, onClose, ...props}) {
    return (
        <Popover 
            className={s.sharing}
            pin={pin}
            onClose={onClose}>
            <Title {...props} />
            <Public {...props} />
            <Collaborators {...props} />
            <Invite {...props} />
        </Popover>
    )
}