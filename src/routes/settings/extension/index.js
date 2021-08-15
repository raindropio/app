import React from 'react'
import t from '~t'
import { Layout, Separator } from '~co/common/form'
import { Header } from '~co/screen/splitview/main'
import { Title } from '~co/common/header'

import Add from './add'
import BrowserExtensionMode from './browser_extension_mode'
import Features from './features'
import Hotkeys from './hotkeys'

export default ({ match })=>{
	return (
		<>
            {!!match && <Header data-fancy><Title>{t.s('browserExtension')}</Title></Header>}

            <Layout>
                <BrowserExtensionMode />
                
                <Separator />

                <Add />

                <Separator />

                <Features />

                <Separator />

                <Hotkeys />
            </Layout>
        </>
	)
}