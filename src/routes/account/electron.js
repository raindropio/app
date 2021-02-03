import React from 'react'
import t from '~t'
import { API_ENDPOINT_URL } from '~data/constants/app'
import config from '~config'

import { Layout, Label, Buttons } from '~co/common/form'
import Button from '~co/common/button'
import Header, { Title } from '~co/common/header'
import Icon from '~co/common/icon'

export default function AccountElectron() {
    return (
        <>
            <Header data-no-shadow style={{minHeight: 0}}>
                <Title>{t.s('welcome')} Raindrop.io</Title>
            </Header>

            <Layout>
                <Label>{t.s('raindropTagline')}</Label>
                <div />

                <Buttons>
                    <Button
                        href={config.links.home}
                        variant='outline'
                        data-block>
                        {t.s('about')}…
                    </Button>

                    <Button
                        href={`${API_ENDPOINT_URL}auth/jwt?done_uri=rnio://account/jwt`}
                        target='_blank'
                        variant='primary'
                        data-block>
                        <Icon name='open' size='micro' />
                        {t.s('signIn')}
                    </Button>
                </Buttons>
            </Layout>
        </>
    )
}