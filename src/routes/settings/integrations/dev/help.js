import React from 'react'
import config from '~config'

import { Buttons } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function DevHelp() {
    return (
        <Buttons>
            <Button
                href={config.links.dev.github}
                target='_blank'>
                <Icon name='github' />
                GitHub
            </Button>

            <Button
                href={config.links.dev.index}
                target='_blank'
                variant='link'>
                <Icon name='help' />
                API Documentation
            </Button>
        </Buttons>
    )
}