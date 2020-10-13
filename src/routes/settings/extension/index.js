import React from 'react'
import { Layout, Separator } from '~co/common/form'

import Add from './add'
import BrowserExtensionMode from './browser_extension_mode'
import Features from './features'
import Hotkeys from './hotkeys'

export default ()=>{
	return (
		<Layout>
            <BrowserExtensionMode />
            
            <Separator />

            <Add />

            <Separator />

            <Features />

            <Separator />

            <Hotkeys />
        </Layout>
	)
}