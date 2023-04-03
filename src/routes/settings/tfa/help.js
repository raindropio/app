import React from 'react'
import t from '~t'
import config from '~config'

import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function SettingsTfaHelp() {
    return (
        <Button 
            as='a'
            href={config.links.help.tfa}
            target='_blank'
            title={t.s('howToUse')}>
            <Icon name='help' />
        </Button>
    )
}