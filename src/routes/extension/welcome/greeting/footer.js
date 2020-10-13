import s from './footer.module.styl'
import React from 'react'
import t from '~t'
import config from '~config'
import { Link } from 'react-router-dom'

import { Buttons, Layout } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function ExtensionWelcome({ match: { path } }) {
    return (
        <Layout className={s.footer}>
            <Buttons>
                <Button 
                    href={config.links.help.index}
                    target='_blank'
                    data-block>
                    <Icon name='help' />
                    {t.s('help')} {t.s('und')} {t.s('support').toLowerCase()}
                </Button>

                <Button
                    as={Link}
                    to={`${path}/activate`}
                    data-block
                    variant='primary'>
                    {t.s('continue')}
                    <Icon name='next' size='micro' />
                </Button>
            </Buttons>
        </Layout>
    )
}