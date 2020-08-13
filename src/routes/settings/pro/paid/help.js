import React from 'react'
import t from '~t'
import { Label } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function ProHelp() {
    return (
        <>
            <Label>{t.s('info')}</Label>
            <div>
                <Button>
                    <Icon name='cloud' size='micro' />
                    {t.s('all')} {t.s('features').toLowerCase()}
                </Button><br />

                <Button>
                    <Icon name='list' size='micro' />
                    {t.s('comparePlans')}
                </Button><br />

                <Button>
                    <Icon name='open' size='micro' />
                    FAQ
                </Button>
            </div>
        </>
    )
}