import s from './index.module.styl'
import React from 'react'

import Modal, { Content } from '~co/overlay/modal'
import Title from './title'
import Public from './public'
import Collaborators from './collaborators'
import Invite from './invite'

export default function CollectionSharingView({ pin, onClose, ...props}) {
    return (
        <Modal 
            className={s.sharing}
            pin={pin}
            onClose={onClose}>
            <Title {...props} />

            <Content>
                <Public {...props} />
                <Collaborators {...props} />
                <Invite {...props} />
            </Content>
        </Modal>
    )
}