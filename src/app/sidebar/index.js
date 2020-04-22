import React from 'react'
import t from '~t'

import Icon from '~icon'
import CollectionsList from '../../co/collections'
import CollectionsToolbar from '../../co/collections/toolbar'
import SuperOverflow from '../../co/common/superOverflow'
import TabBar from './tabBar'
import SidebarWrap from '../../co/columns/sidebarWrap'
import Tools from './tools'

import keyvalStore from '../../stores/keyval'
import statsStore from '../../stores/stats'
import New from '../../co/collections/new'
import ClipperSave from '../parts/clipperSave'
import UserStore from '../../stores/user'
import _ from 'lodash'

class Sidebar extends React.Component {
	displayName = "sidebar"

	constructor(props) {
		super(props);

		this.state = {
			urlActive: this.addURLIsActive()
		};
	}

	onKeyvalChange = ()=>{
		if (this.state.urlActive != this.addURLIsActive())
			this.setState({urlActive: this.addURLIsActive()});
	}

	onStatChange = ()=>{
		this.setState({stat:true});
	}

	componentDidMount() {
		this.unsubscribeStat = statsStore.listen(this.onStatChange);
		this.unsubscribeKeyval = keyvalStore.listen(this.onKeyvalChange);


			/*if (!document.getElementById('headwayapp')){
				window.HW_config = {
					selector: "#changeLog", // CSS selector where to inject the badge
					account: "k7Kjgx", // your account ID,
					translations: {
						title: t.s("whatsNew")+"?",
						readMore: t.s("seeChangeLog"),
						labels: {
							"New": t.s("newString"),
							"improvement": "Updates",
							"fix": "Fixes"
						}
					}
				};

				var h = document.createElement('script');
				h.id = "headwayapp";
				//only executes in another environment. also can't be executed because violates content_security_policy!!
				//widget for updates feed
				h.setAttribute('src','https://cdn.headwayapp.co/widget.js');
				document.head.appendChild(h);
			}else{
				if(typeof Headway != "undefined")
					Headway.init()
			}*/

    }

    componentWillUnmount() {
    	this.unsubscribeKeyval();
    	this.unsubscribeStat();
    }

	addURLIsActive() {
		return ((keyvalStore.onGet('mode-panel')||{}).page=="url");
	}

	handleAddURL() {
		if (!this.addURLIsActive()){
			keyvalStore.onSet('mode-panel', {page: "url"})
			this.setState({urlActive:true});
		}
		else{
			keyvalStore.onRemove('mode-panel');
			this.setState({urlActive:false});
		}
	}

	renderPromo() {
		if (UserStore.isPro())
			return null;
		
		return (
			<a href="#/settings/upgrade" className="proAccountBlock">
				<span className="circles">
					<span className="circle tag"><Icon name="tag_active" /></span>
					<span className="circle dropbox"><Icon name="dropbox" /></span>
					<span className="circle nested"><Icon name="diamond_active" /></span>
					<span className="circle upload"><Icon name="upload_active" /></span>
				</span>
				<span className="title">
					<b dangerouslySetInnerHTML={{__html: t.s("proGreeting")+"! "}}/>
					{t.s('explore')} <Icon name="next" size="micro" />
				</span>
			</a>
		);
	}

	render() {
		var newCollection;
		try{
			//if (UserStore.getUser().groups.length>1)
				newCollection = (
					<footer>
						<New group={0} isFirst={true} />
					</footer>
				);
		}catch(e){}


		return (
			<aside id="sidebar">
				<header className="hide-on-clipper">
					<div className="headerWrap">
						{this.props.toggleSidebarIcon}
						
						<div className="sidebarHeaderTitle">
							<Icon name="raindrop_logo" className="raindropLogo" />
						</div>

						<div id="changeLog"/>
						
						<a key="headBookmark" tabIndex="299" className={"hide-on-clipper button flat "+(this.state.urlActive?"active":"")} title={t.s("addBookmark")} id="addNewURL" onClick={this.handleAddURL.bind(this)}><b><Icon name="add" className="icon-add" /></b></a>
					</div>
				</header>

				<ClipperSave />

				<SuperOverflow
					id="sidebarContent"
					className='collections-scroll-block'
					data-initialScrollTop={38}>
					<CollectionsToolbar />

					<div className='collections-scroll-main-content'>
						<CollectionsList />
						<Tools />
					</div>
				</SuperOverflow>

				{newCollection}

				{this.renderPromo()}
				<TabBar active="app" />
			</aside>
		);
	}
}
//Pop.show('url',{pin:"addNewURL",force:"vertical"})

export default SidebarWrap(Sidebar)