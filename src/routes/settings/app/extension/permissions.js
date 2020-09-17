import React from 'react'
import t from '~t'
import browser from '~target/extension/browser'

import { Label, Checkbox, SubLabel } from '~co/common/form'
import { Error } from '~co/overlay/dialog'

export default class SettingsExtensionPermissions extends React.Component {
    state = {
        tabs: false
    }

    async componentDidMount() {
        await this.reload()
    }

    async reload() {
        this.setState({
            tabs: await browser.permissions.contains({
                permissions: ['tabs']
            })
        })
    }

    onChangeTabs = ()=>{
        const { tabs } = this.state

        browser.permissions[tabs?'remove':'request']({
            permissions: ['tabs']
        })
            .then(()=>this.reload())
            .catch(Error)
    }

    render() {
        const { tabs } = this.state

        return (
            <>
                <Label>
                    {t.s('permissions')}
                </Label>
                <div>
                    <Checkbox 
                        checked={tabs}
                        onChange={this.onChangeTabs}>
                        {t.s('access')} {t.s('all').toLowerCase()} {t.s('tabs').toLowerCase()}
                    </Checkbox>

                    <SubLabel>
                        Saved pages will be marked with [✓] icon
                    </SubLabel>
                </div>
            </>
        )
    }
}