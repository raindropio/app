import React from 'react'
import t from '~t'
import Pop from '~actions/pop'
import Tabs from '../../common/tabs'

import Loading from '../loading'
import Content from './content'
import Templates from './templates'
import Upload from './upload'
import Link from './link'

export default class NewCover extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            tab: localStorage.getItem('nc-tab') || 'templates',
            loading: false
        }
    }

    tabs = {
        items: [
            { key: 'templates', title: t.s('templates') },
            { key: 'upload', title: t.s('upload') },
            { key: 'link', title: t.s('link') }
        ],
        onChange: (tab) => {
            this.setState({tab})
            localStorage.setItem('nc-tab', tab)
        }
    }

    actions = {
        onLoading: (loading)=> this.setState({loading}),
        onSelect: (type, value)=>{
            this.actions.onLoading(true)

            this.props.onSelect(type, value, (result)=>{
                if (result)
                    Pop.close()
                else
                    this.actions.onLoading(false)
            })
        },
        onRemove: (e)=>{
            e.preventDefault()
            this.actions.onSelect('link', '')
        }
    }

    renderContent = ()=>{
        let Component
        switch(this.state.tab) {
            case 'templates': Component = Templates; break
            case 'upload': Component = Upload; break
            case 'link': Component = Link; break
        }

        return Component && <Component {...this.actions} />
    }

	render() {
		return (
			<div className='pop-content newCover'>
                {this.state.loading && <Loading />}

                <header>
                    <Tabs items={this.tabs.items} active={this.state.tab} onChange={this.tabs.onChange} />

                    <a href='' className='button' onClick={this.actions.onRemove}>{t.s('remove')}</a>
                </header>

                <Content id={this.state.tab} key={this.state.tab}>
                    {this.renderContent()}
                </Content>
            </div>
		);
	}
}