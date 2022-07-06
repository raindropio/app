import s from './expanded.module.styl'
import t from '~t'
import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { highlights as getHighlights } from '~data/selectors/bookmarks'
import { toggleHighlights } from '~local/actions'
import links from '~config/links'

import Header, { Title, Space } from '~co/common/header'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Highlights from '~co/highlights/items'
import CopyButton from '~co/highlights/copy-button'
import ExportButton from '~co/highlights/export-button'

export default function ReaderHighlightsExpanded({ item: { _id }, webViewRef }) {
    const dispatch = useDispatch()
    const highlights = useSelector(state=>getHighlights(state, _id))
    const onCollapseClick = useCallback(()=>dispatch(toggleHighlights()), [])

    return (
        <div className={s.wrap}>
            <Header 
                data-fancy
                data-no-shadow>
                <Title>{highlights.length} {t.s('highlights').toLowerCase()}</Title>
                
                <Space />

                <Button 
                    target='_blank'
                    href={links.help.highlights.index}
                    variant='link'
                    title={t.s('add')+' '+t.s('highlights').toLowerCase()}>
                    <Icon name='add' />
                </Button>

                <CopyButton _id={_id}>
                    <Icon name='duplicates' />
                </CopyButton>

                <ExportButton _id={_id}>
                    <Icon name='download' />
                </ExportButton>

                <Button onClick={onCollapseClick}>
                    <Icon name='close' />
                </Button>
            </Header>

            <div className={s.items}>
                <Highlights 
                    _id={_id}
                    webViewRef={webViewRef} />
            </div>
        </div>
    )
}