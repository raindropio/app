import React from 'react'
import { target } from '~target'
import { Separator } from '~co/common/form'

import BrowserExtensionMode from './browser_extension_mode'
import Add from './add'

export default ()=>{
    if (target != 'extension')
        return null

	return (
		<>
            <BrowserExtensionMode />
            <Add />
            <Separator />
        </>
	)
}