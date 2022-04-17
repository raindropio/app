import s from './footer.module.styl'
import React from 'react'
import t from '~t'
import config from '~config'
import { Link } from 'react-router-dom'

import { Buttons, Layout } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function ExtensionWelcome() {
    return (
        <Layout className={s.footer}>
            <Buttons>
                <Button 
                    href={config.links.help.index}
                    target='_blank'>
                    <Icon name='help' />
                    <span>{t.s('help')} {t.s('und')} {t.s('support').toLowerCase()}</span>
                </Button>

                <Button
                    as={Link}
                    to='activate'
                    variant='primary'>
                    {t.s('continue')}
                    <Icon name='next' size='micro' />
                </Button>
            </Buttons>
        </Layout>
    )
}