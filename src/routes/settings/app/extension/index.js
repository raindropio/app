import React from 'react'
import { Separator } from '~co/common/form'

import BrowserExtensionMode from './browser_extension_mode'
import Add from './add'

export default ()=>{
    if (process.env.APP_TARGET != 'extension')
        return null

	return (
		<>
            <BrowserExtensionMode />
            <Add />
            <Separator />
        </>
	)
}