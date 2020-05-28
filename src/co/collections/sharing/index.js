import React from 'react'
import Popover from '~co/overlay/popover'
import Title from './title'
import Public from './public'
import Collaborators from './collaborators'
import Invite from './invite'

export default function CollectionSharingView({ onClose, ...props}) {
    return (
        <Popover onClose={onClose}>
            <div className='pop-content'>
                <div className='list'>
                    <Title {...props} />
                    <Public {...props} />
                    <Collaborators {...props} />
                    <Invite {...props} />
                </div>
            </div>
        </Popover>
    )
}