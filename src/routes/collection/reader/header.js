import React from 'react'
import t from '~t'
import { Header } from '~co/screen/splitview/reader'
import Icon from '~co/common/icon'
import Tabs from '~co/common/tabs'

const defaultTabs = [
    {
        key: 'preview',
        title: t.s('preview'),
        icon: 'article'
    },
    {
        key: 'cache',
        title: t.s('permanentCopy'),
        icon: 'cloud'
    },
    {
        key: 'web',
        title: 'Web',
        icon: 'web'
    },
    {
        key: 'edit',
        title: t.s('editMin'),
        icon: 'info'
    }
]

export default class ReaderHeader extends React.PureComponent {
    render() {
        const { link, important, tab, support, actions } = this.props

        return (
            <Header
                onBackClick={actions.back}
                onFullscreenClick={actions.fullscreenToggle}>
                <div className='maxCenter'>
                    <Tabs
                        items={defaultTabs.filter(({key})=> support.includes(key) )}
                        active={tab}
                        onChange={actions.setTab}
                        className='hide-on-clipper' />
                </div>
        
                <a href={link} target='_blank' className='button hide-on-extension' title={t.s('open')}>
                    <Icon name='open' />
                </a>
				<a className={'button '+(important ? 'active' : '')} onClick={actions.important}  title={t.s('add') +' ' + t.s('to') + ' ' + t.s('favoriteSites').toLowerCase()}>
                    <Icon name={'like'+(important ? '_active' : '')} />
                </a>
				<a className='button' title={t.s('remove')} onClick={actions.remove}>
                    <Icon name='trash' />
                </a>
            </Header>
        )
    }
}