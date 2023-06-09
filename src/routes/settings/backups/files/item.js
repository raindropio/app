import React from 'react'
import { API_ENDPOINT_URL } from '~data/constants/app'

import { Item, ItemIcon, ItemTitle } from '~co/common/list'
import Icon from '~co/common/icon'
import { LongDateTime } from '~modules/format/date'
import Button, { ButtonsGroup } from '~co/common/button'

export default function SettingsBackupsFilesItem({ _id, created }) {
    return (
        <Item>
            <ItemIcon><Icon name='cache_ready' /></ItemIcon>
            <ItemTitle><LongDateTime date={created}/></ItemTitle>

            <ButtonsGroup>
                <Button href={`${API_ENDPOINT_URL}backup/${_id}/html`} download>
                    <Icon name='download' size='micro' />
                    HTML
                </Button>

                <Button href={`${API_ENDPOINT_URL}backup/${_id}/csv`} download>
                    <Icon name='download' size='micro' />
                    CSV
                </Button>
            </ButtonsGroup>
        </Item>
    )
}