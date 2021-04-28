import React from 'react'
import t from '~t'
import User from './user'

import { Section } from '~co/common/list'
import { Layout, Title, Label } from '~co/common/form'

export default function CollectionSharingCollaboratorsView({ users={}, onUnshare, ...etc }) {
    const groups = Object.entries(users)

    if (!groups.length)
        return (
            <Layout>
                <Title>{t.s('shareCollaborate')}</Title>
                <Label>{t.s('collaboratorsLead')}</Label>
            </Layout>
        )

    return (
        <>
            <Layout>
                <Title>
                    {t.s('members')}

                    {etc.collection.access && etc.collection.access.level >= 3 && (
                        <a href='' onClick={onUnshare} variant='outline' style={{flex: 1, textAlign: 'right'}}>
                            {t.s('unshareCollection')}
                        </a>
                    )}
                </Title>
            </Layout>

            {groups.map( ([group, users])=>{
                let label
                switch(group) {
                    case 'member': label = t.s('role_member')+' '+t.s('und')+' '+t.s('invite').toLowerCase(); break
                    default: label = t.s('role_'+group)
                }
        
                return (
                    <div key={group}>
                        <Section>{label}</Section>
                        
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
        </>
    )
}