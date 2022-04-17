import React from 'react'
import t from '~t'
import pjson from '../../../../package.json'
import config from '~config'

import { Section, SectionTitle } from '~co/common/list'
import { Item, ItemIcon, ItemTitle, ItemLink } from '~co/common/list'
import Icon from '~co/common/icon'

export default function SettingsSidebarApp() {
    return (
        <>
            <Section>
                <SectionTitle>Raindrop.io {pjson.version}</SectionTitle>
            </Section>

            <Item>
                <ItemIcon><Icon name='help' /></ItemIcon>
                <ItemTitle>{t.s('help')}</ItemTitle>
                <ItemLink href={config.links.help.index} target='_blank' />
            </Item>

            <Item>
                <ItemIcon><Icon name='cloud' /></ItemIcon>
                <ItemTitle>{t.s('about')}</ItemTitle>
                <ItemLink href={config.links.help.about} target='_blank' />
            </Item>
        </>
    )
}