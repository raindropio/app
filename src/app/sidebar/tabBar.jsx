import React from 'react'
import t from 't'
import shallowCompare from 'react-addons-shallow-compare'
import environment from '../../helpers/environment'

import Icon from 'icon'

var tabItems = [
	{id: "app", title: t.s("my"), icon: "home"},
	{id: "install", title: t.s("install"), icon: "install"},
	{id: "settings", title: t.s("settings"), icon: "settings"}
]

export default class TabBar extends React.Component {
	displayName: "app/sidebar/tabBar"

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
    }

	onClick(href,isActive,index) {
		if (isActive) return;
		var link = "#/" + href;
		window.location.href = link;
	}

	render() {
		//if (environment.isClipper() && !environment.isClipperSafari())
		//	return null;

		var items = tabItems.map((item,index)=>{
			var isActive = (item.id==this.props.active);
			var styler;

			if ((isActive)&&(item.color)){
				styler = <style dangerouslySetInnerHTML={{__html: ':root {--accentColor: '+item.color+'}'}}/>
			}

			return (
				<div key={item.id} onClick={(e)=>this.onClick(item.id,isActive,index)} className={"item " + (isActive ? "active" : "")} title={item.title}>
					<Icon name={item.icon+(isActive ? "_active" : "")} size="24" />
					{/*<div className="title"><span>{item.title}</span></div>*/}
					{styler}
				</div>
			);
		})

		return (
			<div className="tabBar" key="pageSidebarTabBar">
				{items}
			</div>
		);
	}
}