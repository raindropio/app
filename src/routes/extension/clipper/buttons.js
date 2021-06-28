import React from 'react'
import t from '~t'
import { Link } from 'react-router-dom'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function ExtensionClipperButtons({ collectionId }) {
    return (
        <Button
            as={Link}
            to={`/extension/tabs/${collectionId}`}>
            <Icon name='add_tabs' />
            {t.s('tabs')}…
        </Button>
    )
}