import React from 'react'
import { Helmet } from 'react-helmet'
import t from '~t'

import { Header } from '~co/screen/splitview/reader'
import { Space } from '~co/common/header'
import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Tabs from '~co/common/tabs'
import Settings from './settings'

export default class ReaderHeader extends React.PureComponent {
    defaultTabs = [
        {
            key: 'edit',
            title: t.s('edit'),
            icon: 'edit'
        },
        {
            key: 'preview',
            title: t.s('preview'),
            icon: 'show'
        },
        {
            key: 'cache',
            title: t.s('permanentCopy'),
            icon: 'cloud'
        }
    ]

    getTabTitle = ()=>{
        const active = this.defaultTabs.find(({key})=>key==this.props.tab)
        if (active) return active.title
        return null
    }

    onImportantClick = (e)=>{
        e.preventDefault()
        this.props.actions.oneImportant(this.props.item._id)
    }

    onRemoveClick = (e)=>{
        e.preventDefault()
        this.props.actions.oneRemove(this.props.item._id)
    }

    render() {
        const { item, tab, tabs, access } = this.props
        const { getLink, setTab, onFullscreenToggleClick } = this.props

        return (
            <Header
                backTo={getLink({ bookmark: null, tab: null })}
                onFullscreenClick={onFullscreenToggleClick}>
                <Helmet>
                    <title>{this.getTabTitle()+' '+item.title}</title>
                </Helmet>

                <Settings
                    tab={tab}
                    item={item} />

                <Space/>

                <Tabs
                    items={this.defaultTabs.filter(({key})=> tabs.includes(key) )}
                    active={tab}
                    onChange={setTab} />
                    
                <Space/>
        
                <Button href={item.link} target='_blank' title={t.s('open')}>
                    <Icon name='open' />
                </Button>
				
                {access.level >= 3 ? (
                    <>
                        <Button variant={item.important ? 'link' : ''} onClick={this.onImportantClick}  title={t.s('add') +' ' + t.s('to') + ' ' + t.s('favoriteSites').toLowerCase()}>
                            <Icon name={'like'+(item.important ? '_active' : '')} />
                        </Button>
                        <Button title={t.s('remove')} onClick={this.onRemoveClick}>
                            <Icon name='trash' />
                        </Button>
                    </>
                ) : null}
            </Header>
        )
    }
}