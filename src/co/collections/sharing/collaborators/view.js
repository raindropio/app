import React from 'react'
import t from '~t'
import User from './user'

export default function CollectionSharingCollaboratorsView({ users={}, onUnshare, ...etc }) {
    const groups = Object.entries(users)

    if (!groups.length)
        return null

    return (
        <>
            {groups.map( ([group, users])=>{
                let label
                switch(group) {
                    case 'member': label = t.s('role_member')+' '+t.s('und')+' '+t.s('inviteMorePeople').toLowerCase(); break
                    default: label = t.s('role_'+group)
                }
        
                return (
                    <div key={group}>
                        <div className='separator'>{label}</div>
                        
                        {users.map((user,index) => (
                            <User 
                                key={user._id}
                                first={!index}
                                {...etc} 
                                {...user} />
                        ))}
                    </div>
                )
            })}

            <footer>
                <a className='button default' onClick={onUnshare}>
                    <b>{t.s('unshareCollection')}</b>
                </a>
            </footer>
        </>
    )
}