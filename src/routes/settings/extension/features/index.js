import React from 'react'
import t from '~t'
import browser from '~target/extension/browser'
import config from '~config'
import { permissions } from '~target'

import { Title, Checkbox, SubLabel } from '~co/common/form'
import Icon from '~co/common/icon'
import { Error } from '~co/overlay/dialog'

export default class SettingsExtensionFeatures extends React.Component {
    state = {
        permissions: [
            {
                id: 'tabs',
                enabled: false,
                title: t.s('highlightSavedPages'),
                excerpt: t.s('highlightSavedPagesD')
            }
        ]
    }

    async componentDidMount() {
        await this.reload()
    }

    async reload() {
        if (!browser || 'permissions' in browser === false)
            return
            
        const p = [...this.state.permissions]

        for(const index in p)
            p[index].enabled = await permissions.contains(p[index].id)

        this.setState({ permissions: p })
    }

    onChangePermission = (e)=>{
        const index = parseInt(e.target.getAttribute('data-index'))
        const { id, enabled } = this.state.permissions[index]

        permissions[enabled?'remove':'request'](id)
            .then(()=>this.reload())
            .catch(Error)
    }

    renderPermission = ({ id, title, excerpt, enabled }, index)=>(
        <div key={id}>
            <Checkbox 
                data-index={index}
                checked={enabled}
                onChange={this.onChangePermission}>
                {title}
            </Checkbox>

            {excerpt && (<SubLabel>{excerpt}</SubLabel>)}
        </div>
    )

    render() {
        return (
            <>
                <Title>
                    {t.s('features')}
                </Title>
                
                {this.state.permissions.map(this.renderPermission)}

                {!!('omnibox' in browser) && (
                    <div>
                        <Icon name='search' size='micro' />&nbsp;&nbsp;
                        {t.s('omniboxD')}

                        <SubLabel>
                            <a href={config.links.help.omnibox} target='_blank'>{t.s('howToUse')}</a>
                        </SubLabel>
                    </div>
                )}
            </>
        )
    }
}