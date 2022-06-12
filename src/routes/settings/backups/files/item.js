import React from 'react'

import { Item, ItemIcon, ItemTitle } from '~co/common/list'
import Icon from '~co/common/icon'
import { LongDateTime } from '~modules/format/date'
import Button, { ButtonsGroup } from '~co/common/button'

export default function SettingsBackupsFilesItem({ created, files }) {
    return (
        <Item>
            <ItemIcon><Icon name='cache_ready' /></ItemIcon>
            <ItemTitle><LongDateTime date={created}/></ItemTitle>

            <ButtonsGroup>
                <Button href={files.html} download>
                    <Icon name='download' size='micro' />
                    HTML
                </Button>

                <Button href={files.csv} download>
                    <Icon name='download' size='micro' />
                    CSV
                </Button>
            </ButtonsGroup>
        </Item>
    )
}