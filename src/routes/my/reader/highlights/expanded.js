import s from './expanded.module.styl'
import t from '~t'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { toggleHighlights } from '~local/actions'

import Header, { Title, Space } from '~co/common/header'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function ReaderHighlightsExpanded({ item: { _id } }) {
    const dispatch = useDispatch()
    const onCollapseClick = useCallback(()=>dispatch(toggleHighlights()), [])

    return (
        <div className={s.wrap}>
            <Header 
                data-fancy
                data-no-shadow>
                <Title>{t.s('highlights')}</Title>
                <Space />
                <Button onClick={onCollapseClick}>
                    <Icon name='close' />
                </Button>
            </Header>

            <div className={s.items}>
                
            </div>
        </div>
    )
}