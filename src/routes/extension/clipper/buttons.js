import React from 'react'
import t from '~t'
import { Link } from 'react-router-dom'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import { preload } from '~routes/extension/tabs'

export default function ExtensionClipperButtons({ collectionId }) {
    return (
        <Button
            as={Link}
            to={`/extension/tabs/${collectionId}`}
            onMouseOver={preload}>
            <Icon name='add_tabs' />
            {t.s('tabs')}…
        </Button>
    )
}