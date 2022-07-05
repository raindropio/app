import React from 'react'
import { Item, ItemIcon, ItemTitle } from '~co/common/list'
import Icon from '~co/common/icon'

export default function SettingsIntegrationsReadyItem({ href, icon='integrations', title }) {
    return (
        <Item
            as='a'
            href={href}
            target='_blank'>
            <ItemIcon><Icon name={icon} /></ItemIcon>
            <ItemTitle>{title}</ItemTitle>
        </Item>
    )
}