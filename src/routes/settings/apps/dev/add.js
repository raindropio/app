import React from 'react'
import t from '~t'
import AppsStore from '~stores/apps'

import { Header, Content } from '~co/screen/splitview/main'
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
            <>
                <Header title={(<span>
                    <a href="#/settings/apps/dev">{t.s('dev')}</a>
                    &nbsp;/&nbsp;
                    New application
                </span>)} />

                <Content>
                    <Form 
                        acceptTerms={true}
                        onSubmit={this.onSubmit} />
                </Content>
            </>
        )
    }
}