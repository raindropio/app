import React from 'react'
import t from '~t'
import config from '~config'

import Icon from '~icon'

var tabItems = [
	{id: 'app', title: t.s('my'), icon: 'home'},
	{id: 'install', title: t.s('install'), icon: 'install', href: config.links.download},
	{id: 'settings', title: t.s('settings'), icon: 'settings'}
]

export default class TabBar extends React.Component {
	displayName = 'app/sidebar/tabBar'

	render() {
		var items = tabItems.map((item,index)=>{
			var isActive = (item.id==this.props.active);
			var styler;

			if ((isActive)&&(item.color)){
				styler = <style dangerouslySetInnerHTML={{__html: ':root {--accentColor: '+item.color+'}'}}/>
			}

			return (
				<a key={item.id} href={item.href || `#/${item.id}`} target={item.href?'_blank':''} className={'item ' + (isActive ? 'active' : '')} title={item.title}>
					<Icon name={item.icon+(isActive ? '_active' : '')} size='24' />
					{styler}
				</a>
			);
		})

		return (
			<div className='tabBar' key='pageSidebarTabBar'>
				{items}
			</div>
		)
	}
}