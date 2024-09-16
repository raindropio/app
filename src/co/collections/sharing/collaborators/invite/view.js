import React, { useState, useCallback } from 'react'
import t from '~t'
import links from '~config/links'

import { Prompt, Error } from '~co/overlay/dialog'
import { Layout, Title, Label, Radio, Buttons } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function CollectionSharingInviteView({ access, onInvite }) {
    const [role, setRole] = useState('member')
    const [loading, setLoading] = useState(false)

    const onRoleChange = useCallback(e=>{
        setRole(e.currentTarget.value)
    }, [setRole])

    const onSubmit = useCallback(e=>{
        e.preventDefault()
        setLoading(true)

        onInvite(
            role,
            async(link)=>{
                const copy = await Prompt(
                    t.s('invite'), 
                    link,
                    {
                        description: `
                            Share this link with the person you want to invite to the collection.
                            Anyone with this link and a Raindrop.io account can join and ${role == 'member' ? 'edit' : 'view'} the collection.
                            Please note, this link can only be used once and will expire in a week.
                        `,
                        ok: t.s('copyLinkToClipboard')
                    }
                )

                if (copy) {
                    await navigator.permissions.query({name: 'clipboard-write'})
                    await await navigator.clipboard.writeText(link)
                }
                setLoading(false)
            },
            (error)=>{
                Error(error, {
                    message: t.s('sendInvites')+' '+t.s('server').toLowerCase()
                })
                setLoading(false)
            }
        )
    }, [onInvite, role, setLoading])

    if (!access || access.level < 3)
        return null

    return (
        <form onSubmit={onSubmit}>
            <Layout type='grid'>
                <Title>{t.s('invite')}</Title>
    
                <Label>{t.s('withAccessLevel')}</Label>
                <div>
                    <Radio 
                        checked={role=='member'}
                        value='member'
                        disabled={loading}
                        onChange={onRoleChange}>
                        {t.s('role_members')+' '+t.s('und')+' '+t.s('invite').toLowerCase()}
                    </Radio>

                    <Radio 
                        checked={role=='viewer'}
                        value='viewer'
                        disabled={loading}
                        onChange={onRoleChange}>
                        {t.s('role_viewer')}
                    </Radio>
                </div>

                <Buttons variant='between'>
                    <Button 
                        as='input'
                        type='submit'
                        variant='primary'
                        disabled={loading}
                        value={t.s('invite')+(loading ? '…' : '')} />

                    <Button
                        href={links.help.collaboration}
                        target='_blank'>
                        <Icon name='help' />
                        {t.s('howToUse')}
                    </Button>
                </Buttons>
            </Layout>
        </form>
    )
}