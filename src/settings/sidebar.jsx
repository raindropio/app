import React from 'react'
import t from 't'
import config from 'config'
import environment from '../helpers/environment'

import Icon from 'icon'
import CollectionItem from '../co/collections/item'
import SuperOverflow from '../co/common/superOverflow'
import TabBar from '../app/sidebar/tabBar'

import SidebarWrap from '../co/columns/sidebarWrap'

var _ = {
  capitalize: require('lodash/capitalize')
}

class Sidebar extends React.Component {
	displayName: "sidebar"

	componentDidMount() {
		if (typeof document !== 'undefined'){
			var active = document.querySelector('#sidebar .active .superLink');
			if (active) active.focus();
		}
	}

	isActive(id) {
		if (typeof window == "undefined") return false;
		return (window.location.hash.indexOf(id)!=-1);
	}

	renderItem(name,title, icon, linkTarget) {
		var isActive = this.isActive(name);
		var link = "#/settings/"+name, target = "";

		if (name.indexOf('http')==0){
			link = name;
			target = "_blank";
		}
		return <CollectionItem
					active={isActive}
					item={{
						title: <span>{title} {(linkTarget||target)=="_blank"?<Icon name="open" size="micro" />:null}</span>,
						icon: (icon||name)+(isActive?"_active":""),
						link: link,
						target: linkTarget||target
					}} />;
	}

	render() {
		return (<aside id="sidebar">
			<header>
				<div className="headerWrap">
					{this.props.toggleSidebarIcon}
					<div className="sidebarHeaderTitle">
						{t.s("settings")}
					</div>
				</div>
			</header>

			<SuperOverflow id="sidebarContent">
				<section>
					{this.renderItem('upgrade', t.s("upgradeAccount"), "diamond")}
					{this.renderItem('common', t.s("commonSettings"), "settings_alt")}
					{this.renderItem('profile', t.s("profile"), "profile")}
				</section>

				<section>
					<div className="group">
						<div className="title">{_.capitalize(t.s("elements2"))}</div>
					</div>

					{this.renderItem((environment.isDesktop()||environment.isClipper()?'https://raindrop.io/app#/settings/':"")+'integrations', t.s("integrations"), "integrations")}
					{this.renderItem((environment.isClipper()?config.getImportLink():'import'), t.s("importBookmarks"), "import")}
					{this.renderItem('export', t.s("exportBookmarks"), "export")}
				</section>

				<section>
					<div className="group">
						<div className="title">{t.s("interest_technology_applications")}</div>
					</div>

					{this.renderItem('apps/authorized', t.s("connected")+' '+t.s("interest_technology_applications").toLowerCase(), "extension")}
					{this.renderItem('apps/dev', t.s("dev"), "dev")}
				</section>

				<section>
					<div className="group">
						<div className="title">{_.capitalize(config.home)}</div>
					</div>

					{this.renderItem('https://raindropio.canny.io/feature-requests', t.s("pro_nextFeatures"), "tools")}
					{this.renderItem('https://help.raindrop.io/'/* 'help'*/, t.s("help"), "history")}
				</section>

				<section>
					{this.renderItem('about', t.s("about"), "cloud")}
				</section>
			</SuperOverflow>

			<footer>
				<CollectionItem item={{title: t.s("logOut"), icon: "exit"}} onClick={UserStore.onLogOut} />
			</footer>

			<TabBar active="settings" /> 
		</aside>);
	}
}

export default SidebarWrap(Sidebar)