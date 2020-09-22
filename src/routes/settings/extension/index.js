import React from 'react'
import { Layout, Separator } from '~co/common/form'

import BrowserExtensionMode from './browser_extension_mode'
import Add from './add'
import Permissions from './permissions'

export default ()=>{
	return (
		<Layout type='grid'>
            <BrowserExtensionMode />
            
            <Separator />

            <Add />

            <Separator />

            <Permissions />
        </Layout>
	)
}