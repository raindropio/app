import React from 'react'
import t from '~t'
import config from '~config'

import { Layout, Label } from '~co/common/form'
import Button from '~co/common/button'

export default function AccountEmbedded() {
    return (
        <>
            <Layout>
                <Label>{t.s('startToSave')}</Label>
                <div />

                <Button
                    href={config.links.app.index}
                    target='_blank'
                    variant='primary'
                    data-block>
                    {t.s('signIn')}
                </Button>
            </Layout>
        </>
    )
}