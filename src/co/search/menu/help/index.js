import s from './index.module.styl'
import React from 'react'
import t from '~t'
import links from '~config/links'

import { Section } from '~co/common/list'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function SearchMenuHelp() {
    return (
        <Section className={s.help}>
            <div className={s.tip}>
                {t.s('putDashToExclude')}
            </div>

            <Button
                href={links.help.search}
                target='_blank'>
                <Icon name='help' />
            </Button>
        </Section>
    )
}