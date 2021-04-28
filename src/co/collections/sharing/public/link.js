import React, { useRef, useCallback } from 'react'
import t from '~t'
import { useSelector } from 'react-redux'
import { user as getUser } from '~data/selectors/user'

import { Layout, Text, Buttons } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function SharingLink({ collection: { slug, _id, public: pub } }) {
    const user = useSelector(state=>getUser(state))
    const link = `https://raindrop.io/${user.name}/${slug||''}-${_id}`

    const input = useRef(null)
    const copy = useCallback(()=>{
        input.current.select()
        input.current.setSelectionRange(0, 99999)
        input.current.focus()
        document.execCommand('copy')
    }, [input])

    if (!pub)
        return null

    return (
        <Layout>
            <Text 
                ref={input}
                type='text'
                readOnly
                autoFocus
                value={link}>
                <Button 
                    href={link}
                    target='_blank'
                    title={t.s('openInBrowser')}>
                    <Icon name='open' />
                </Button>
            </Text>

            <Buttons>
                <Button 
                    data-block
                    variant='primary'
                    onClick={copy}>
                    <Icon name='duplicates' />
                    {t.s('copyURL')}
                </Button>
            </Buttons>
        </Layout>
    )
}