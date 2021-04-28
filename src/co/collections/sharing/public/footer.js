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

    return (
        <Layout>
            <Separator/>

            <Buttons variant='between'>
                <Button
                    variant='outline' 
                    data-block
                    href={pub ? link : links.help.embed}
                    target='_blank'>
                    <Icon name='dev' />
                    Embed
                </Button>

                <Button
                    data-block
                    href={links.help.publicPage}
                    target='_blank'>
                    <Icon name='help' />
                    {t.s('howToUse')}
                </Button>
            </Buttons>
        </Layout>
    )
}