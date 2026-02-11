import React, { useMemo, useCallback } from 'react'
import t from '~t'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Space } from '~co/common/header'
import Tabs from '~co/common/tabs'
import Settings from './settings'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function PageMyItemToolbar({ item, tab, tabs }) {
    const navigate = useNavigate()
    const ai_assistant = useSelector(state=>state.config.ai_assistant)

    const tabItems = useMemo(()=>(
        [
            {
                key: 'edit',
                title: t.s('editMin'),
            },
            ...(ai_assistant ? [{
                key: 'ask',
                title: t.s('ask'),
            }] : []),
            {
                key: 'preview',
                title: t.s('preview'),
            },
            {
                key: 'web',
                title: 'Web',
            },
            {
                key: 'cache',
                title: t.s('permanentCopy'),
            }
        ]
            .filter(({key})=> tabs.includes(key) )
    ), [tabs, ai_assistant])

    const onChangeTab = useCallback(tab=>(
        navigate(tab, { replace: true })
    ), [navigate])
    
    return (
        <>
            <Space/>

            <Tabs
                items={tabItems}
                active={tab}
                onChange={onChangeTab} />
                
            <Space/>

            <Button
                as='a'
                href={item.link}
                target='_blank'>
                <Icon name='open' />
            </Button>

            {tab == 'preview' && (item.type == 'article' || item.type == 'book') ? (
                <Settings
                    tab={tab}
                    item={item} />
            ) : null}
        </>
    )
}