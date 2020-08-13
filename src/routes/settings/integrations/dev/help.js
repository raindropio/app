import React from 'react'
import t from '~t'
import config from '~config'

import { Label } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function DevHelp() {
    return (
        <>
            <Label>{t.s('help')}</Label>

            <Button
                href={config.links.dev.index}
                target='_blank'>
                <Icon name='open' size='micro' />
                API Documentation
            </Button>
        </>
    )
}