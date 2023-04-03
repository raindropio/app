import React from 'react'
import t from '~t'

import { Helmet } from 'react-helmet'
import { Header } from '~co/screen/splitview/main'
import { Title, Space } from '~co/common/header'
import { Layout } from '~co/common/form'

import Help from './help'
import Status from './status'
import Revoke from './revoke'
import Enable from './enable'

export default function SettingsTfa() {
	return (<>
        <Helmet><title>{t.s('tfa')}</title></Helmet>
        <Header data-fancy>
            <Title>{t.s('tfa')}</Title>
            <Space />
            <Help />
        </Header>

        <Layout>
            <Status />
            <Enable />
            <Revoke />
        </Layout>
    </>)
}