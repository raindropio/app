import React from 'react'
import t from '~t'
import { API_ENDPOINT_URL } from '~data/constants/app'

import { Item, ItemTitle, ItemIcon, ItemLink } from '~co/common/list'
import Icon from '~co/common/icon'

function SettingsProfileRemove() {
    //don't do target=_blank, otherwise it can make a mistake (due to different auth in app and browser)
    return (
        <Item>
            <ItemIcon><Icon name='trash' /></ItemIcon>
            <ItemTitle>{t.s('removeAccount')}</ItemTitle>
            <ItemLink href={`${API_ENDPOINT_URL}user/remove`} />
        </Item>
    )
}

export default SettingsProfileRemove