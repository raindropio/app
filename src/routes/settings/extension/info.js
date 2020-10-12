import React from 'react'
import _ from 'lodash'
import t from '~t'
import { openTab, hotkeys } from '~target'

import { Label } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

function SettingsExtensionInfo() {
    return (
        <>
            <Label>
                {t.s('info')}
            </Label>

            <div>
                {hotkeys.link() ? (
                    <Button
                        onClick={()=>openTab(hotkeys.link(), true)}
                        variant='outline'>
                        <Icon name='hotkey' />
                        {_.capitalize(process.env.EXTENSION_VENDOR)}
                        &nbsp;
                        {t.s('helpHotKey').toLowerCase()}
                    </Button>
                ) : null}
            </div>
        </>
    )
}

export default SettingsExtensionInfo