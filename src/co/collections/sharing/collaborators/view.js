import React from 'react'
import t from '~t'
import User from './user'

import { Section } from '~co/common/list'
import { Layout, Title } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function CollectionSharingCollaboratorsView({ users={}, onUnshare, ...etc }) {
    const groups = Object.entries(users)

    if (!groups.length)
        return null

    return (
        <>
            <Layout><Title>
                {t.s('sharing')}
            </Title></Layout>

            {groups.map( ([group, users])=>{
                let label
                switch(group) {
                    case 'member': label = t.s('role_member')+' '+t.s('und')+' '+t.s('inviteMorePeople').toLowerCase(); break
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

            {etc.collection.access && etc.collection.access.level >= 3 && (<Layout>
                <Button onClick={onUnshare} variant='outline' data-block>
                    <Icon name='collapse_all' />
                    {t.s('unshareCollection')}
                </Button>
            </Layout>)}
        </>
    )
}