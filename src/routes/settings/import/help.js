import React from 'react'
import t from '~t'
import config from '~config'

import { Buttons } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function ImportHelp() {
    return (
        <Buttons>
            <Button 
                as='a'
                href={config.links.help.import}
                target='_blank'>
                <Icon name='help' />
                {t.s('howToUse')}
            </Button>
        </Buttons>
    )
}