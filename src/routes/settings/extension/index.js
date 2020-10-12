import React from 'react'
import { Layout, Separator } from '~co/common/form'

import BrowserExtensionMode from './browser_extension_mode'
import Add from './add'
import Features from './features'
import Info from './info'

export default ()=>{
	return (
		<Layout type='grid'>
            <BrowserExtensionMode />
            
            <Separator />

            <Add />

            <Separator />

            <Features />

            <Separator />

            <Info />
        </Layout>
	)
}