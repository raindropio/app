import React from 'react'
import { Helmet } from 'react-helmet'
import t from '~t'

import { Header } from '~co/screen/splitview/reader'
import { Space } from '~co/common/header'
import Tabs from '~co/common/tabs'
import Settings from './settings'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default class ReaderHeader extends React.PureComponent {
    defaultTabs = [
        {
            key: 'edit',
            title: t.s('edit'),
        },
        {
            key: 'web',
            title: 'Web',
        },
        {
            key: 'preview',
            title: t.s('preview'),
        },
        {
            key: 'cache',
            title: t.s('permanentCopy'),
        }
    ]

    getTabTitle = ()=>{
        const active = this.defaultTabs.find(({key})=>key==this.props.tab)
        if (active) return active.title
        return null
    }

    render() {
        const { item, tab, tabs } = this.props
        const { getLink, setTab, onFullscreenToggleClick } = this.props

        return (
            <Header
                backTo={getLink({ bookmark: null, tab: null })}
                onFullscreenClick={onFullscreenToggleClick}>
                <Helmet>
                    <title>{this.getTabTitle()+' '+item.title}</title>
                </Helmet>

                <Space/>

                <Tabs
                    items={this.defaultTabs.filter(({key})=> tabs.includes(key) )}
                    active={tab}
                    onChange={setTab} />
                    
                <Space/>

                <Button
                    as='a'
                    href={item.link}
                    target='_blank'>
                    <Icon name='open' />
                </Button>

                {tab == 'preview' && item.type == 'article' ? (
                    <Settings
                        tab={tab}
                        item={item} />
                ) : null}
            </Header>
        )
    }
}