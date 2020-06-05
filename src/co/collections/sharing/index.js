import React from 'react'
import Modal, { Header, Content } from '~co/overlay/modal'
import Title from './title'
import Public from './public'
import Collaborators from './collaborators'
import Invite from './invite'

export default function CollectionSharingView({ onClose, ...props}) {
    return (
        <Modal onClose={onClose}>
            <Title {...props} />

            <Content>
                <div className='pop-content'>
                    <div className='list'>
                        <Public {...props} />
                        <Collaborators {...props} />
                        <Invite {...props} />
                    </div>
                </div>
            </Content>
        </Modal>
    )
}