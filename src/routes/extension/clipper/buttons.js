import React from 'react'
import t from '~t'
import { useSelector } from 'react-redux'
import { getDraftItem, highlights as getHighlights } from '~data/selectors/bookmarks'

import { Link } from 'react-router-dom'
import Button from '~co/common/button'
import Icon, { Number } from '~co/common/icon'
import { preload } from '~routes/extension/tabs'

export default function ExtensionClipperButtons({ link, collectionId }) {
    const { _id } = useSelector(state=>getDraftItem(state, link))
    const highlights = useSelector(state=>getHighlights(state, _id))

    return (
        <>
            <Button 
                as={Link}
                to={`/extension/highlights/${_id}`}
                variant={highlights.length ? 'link' : 'default'}>
                {highlights.length ? <Number>{highlights.length}</Number> : <Icon name='highlights' />}
                {t.s('highlights')}
            </Button>

            <Button
                as={Link}
                to={`/extension/tabs/${collectionId}`}
                onMouseOver={preload}>
                <Icon name='add_tabs' />
                {t.s('tabs')}
            </Button>

            <div style={{flex:1}} />
        </>
    )
}