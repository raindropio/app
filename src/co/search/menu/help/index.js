import s from './index.module.styl'
import React from 'react'
import t from '~t'
import links from '~config/links'

import { Section, SectionTitle, SectionActions } from '~co/common/list'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function SearchMenuHelp() {
    return (
        <Section className={s.help}>
            <SectionTitle className={s.tip}>
                {t.s('putDashToExclude')}
            </SectionTitle>

            <SectionActions className={s.actions}>
                <Button
                    href={links.help.search}
                    target='_blank'>
                    <Icon name='help' />
                </Button>
            </SectionActions>
        </Section>
    )
}