import React from 'react'
import t from '~t'
import { Layout, Separator } from '~co/common/form'
import { Header } from '~co/screen/splitview/main'
import { Title } from '~co/common/header'

import Add from './add'
import BrowserExtensionMode from './browser_extension_mode'
import Hotkeys from './hotkeys'
import Permissions from './permissions'

export default ({ hideHeader=false })=>{
	return (
		<>
            {!hideHeader && <Header data-fancy><Title>{t.s('browserExtension')}</Title></Header>}

            <Layout>
                <BrowserExtensionMode />
                
                <Separator />

                <Add />

                <Separator />

                <Permissions />

                <Separator />

                <Hotkeys />
            </Layout>
        </>
	)
}