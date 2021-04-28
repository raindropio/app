import React from 'react'
import t from '~t'
import links from '~config/links'

import { Layout, Buttons, Separator } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function SharingFooter() {
    return (
        <Layout>
            <Separator/>

            <Buttons variant='between'>
                <Button
                    variant='outline' 
                    data-block
                    href={links.help.embed}
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