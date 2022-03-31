import React from 'react'
import t from '~t'
import links from '~config/links'
import { useSelector } from 'react-redux'
import { user as getUser } from '~data/selectors/user'

import { Layout, Buttons, Separator } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function SharingFooter({ collection: { public: pub, _id, slug } }) {
    const user = useSelector(state=>getUser(state))
    const link = `https://raindrop.io/${user.name}/${slug||''}-${_id}/share`
    const rss = `https://raindrop.io/collection/${_id}/feed`

    return (
        <Layout>
            <Separator/>

            <Buttons variant='between'>
                <Button
                    variant='outline' 
                    href={pub ? link : links.help.embed}
                    target='_blank'>
                    <Icon name='dev' />
                    Embed
                </Button>

                <Button
                    variant='outline' 
                    disabled={!pub}
                    href={rss}
                    target='_blank'>
                    <Icon name='rss' />
                    RSS
                </Button>

                <div style={{flex:1}} />

                <Button
                    href={links.help.publicPage}
                    target='_blank'>
                    <Icon name='help' />
                    {t.s('howToUse')}
                </Button>
            </Buttons>
        </Layout>
    )
}