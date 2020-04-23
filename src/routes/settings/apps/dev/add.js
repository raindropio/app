import React from 'react'
import t from '~t'
import settingsHelpers from '../../parts/helpers'
import AppsStore from '~stores/apps'

import Form from './form'

export default class AppsDevEdit extends React.PureComponent {
    onSubmit = (client, callback)=>{
        AppsStore.onCreateClient(client, id=>{
            callback(id ? true : false)

            if (id)
                window.location.hash=`#/settings/apps/dev/edit/${id}`
        })
    }
        
    render() {
        return (
            <section id="main">
				<header>
					<div className="headerWrap">
						{settingsHelpers.backButton.bind(this)()}
                        <h1 className="min">
                            <a href="#/settings/apps/dev">{t.s('dev')}</a>
                            &nbsp;/&nbsp;
                            New application
                        </h1>
					</div>
				</header>

				<div id="mainBody">
                    <Form 
                        acceptTerms={true}
                        onSubmit={this.onSubmit} />
                </div>
			</section>
        )
    }
}