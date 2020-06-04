import React from 'react'
import t from '~t'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import environment from '~modules/environment'
import config from '~config'
import UserStore from '~stores/user'

import Sidebar, { Header, Content, Footer } from '~co/screen/splitview/sidebar'
import Icon from '~icon'
import CollectionItem from '~co/collections/item'

class SettingsSidebar extends React.Component {
	renderItem(name, title, icon, linkTarget) {
		var isActive = this.props.location.pathname.includes(name)
		var link = '#/settings/'+name, target = ''

		if (name.indexOf('http')==0){
			link = name;
			target = '_blank';
        }
        
		return <CollectionItem
					active={isActive}
					item={{
						title: <span>{title} {(linkTarget||target)=='_blank'?<Icon name='open' size='micro' />:null}</span>,
						icon: (icon||name)+(isActive?'_active':''),
						link: link,
						target: linkTarget||target
					}} />;
    }
    
    render() {
        return (
            <Sidebar>
                <Header title={t.s('settings')} />
        
                <Content>
                    <section>
                        <CollectionItem item={{title: t.s('backToCollection'), icon: 'back', link: '/'}} />
                    </section>

                    <section>
                        <div className='group'>
                            <div className='title'>{_.capitalize(t.s('elements2'))}</div>
                        </div>
                        
                        {this.renderItem('upgrade', t.s('upgradeAccount'), 'diamond')}
                        {this.renderItem('common', t.s('commonSettings'), 'settings_alt')}
                        {this.renderItem('profile', t.s('profile'), 'profile')}
                    </section>
        
                    <section>
                        <div className='group'>
                            <div className='title'>{_.capitalize(t.s('elements2'))}</div>
                        </div>
        
                        {this.renderItem((environment.isClipper()?config.getImportLink():'import'), t.s('importBookmarks'), 'import')}
                        {this.renderItem('export', t.s('exportBookmarks'), 'export')}
        
                        {this.renderItem('duplicates', t.s('duplicates'), 'duplicates')}
                        {this.renderItem('libroken', t.s('broken'), 'broken')}
                        {this.renderItem('tags', t.s('tags'), 'tag')}
                    </section>
        
                    <section>
                        <div className='group'>
                            <div className='title'>{t.s('interest_technology_applications')}</div>
                        </div>
        
                        {this.renderItem((environment.isDesktop()||environment.isClipper()?'https://raindrop.io/app#/settings/':'')+'integrations', t.s('integrations'), 'integrations')}
                        {this.renderItem('apps/authorized', t.s('connected')+' '+t.s('interest_technology_applications').toLowerCase(), 'extension')}
                        {this.renderItem('apps/dev', t.s('dev'), 'dev')}
                    </section>
        
                    <section>
                        <div className='group'>
                            <div className='title'>Raindrop.io</div>
                        </div>
        
                        {this.renderItem('https://raindropio.canny.io/feature-requests', t.s('pro_nextFeatures'), 'tools')}
                        {this.renderItem('https://help.raindrop.io/'/* 'help'*/, t.s('help'), 'history')}
                    </section>
        
                    <section>
                        {this.renderItem('about', t.s('about'), 'cloud')}
                    </section>
                </Content>
        
                <Footer>
                    <CollectionItem item={{title: t.s('logOut'), icon: 'exit'}} onClick={UserStore.onLogOut} />
                </Footer>
            </Sidebar>
        )
    }
}

export default withRouter(SettingsSidebar)