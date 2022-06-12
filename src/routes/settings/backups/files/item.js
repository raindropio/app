import React from 'react'
import t from '~t'

import { Item, ItemIcon, ItemTitle, ItemActions } from '~co/common/list'
import Icon from '~co/common/icon'
import { LongDateTime } from '~modules/format/date'
import Button, { ButtonsGroup } from '~co/common/button'

export default function SettingsBackupsFilesItem({ created, files }) {
    return (
        <Item>
            <ItemIcon><Icon name='cache_ready' /></ItemIcon>
            <ItemTitle><LongDateTime date={created}/></ItemTitle>

            <ItemActions>
                <ButtonsGroup>
                    <Button href={files.html} download>
                        <Icon name='download' size='micro' />
                        {t.s('download')} HTML
                    </Button>

                    <Button href={files.csv} download>
                        <Icon name='download' size='micro' />
                        {t.s('download')} CSV
                    </Button>
                </ButtonsGroup>
            </ItemActions>
        </Item>
    )
}