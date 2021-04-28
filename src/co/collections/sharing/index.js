import s from './index.module.styl'
import React, { useState } from 'react'

import Modal, { Content } from '~co/overlay/modal'
import Tabs from './tabs'
import Title from './title'
import Public from './public'
import Collaborators from './collaborators'

export default function CollectionSharingView({ pin, onClose, ...props}) {
    const [tab, setTab] = useState('public')

    let Component = null
    switch(tab) {
        case 'public': Component = Public; break
        case 'collaborators': Component = Collaborators; break
    }

    return (
        <Modal 
            className={s.sharing}
            pin={pin}
            onClose={onClose}>
            <Title {...props} />

            <Content>
                <Tabs
                    {...props}
                    tab={tab}
                    setTab={setTab} />
                
                <Component {...props} />
            </Content>
        </Modal>
    )
}