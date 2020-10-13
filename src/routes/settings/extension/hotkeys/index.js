import React from 'react'
import t from '~t'
import { openTab, hotkeys } from '~target'

import { Title, SubLabel, Layout } from '~co/common/form'

class SettingsExtensionHotkeys extends React.Component {
    state = {
        all: []
    }

    async componentDidMount() {
        this.setState({
            all: await hotkeys.getAll()
        })
    }

    renderHotkey = ({ description, shortcut, name })=>(
        <div key={name}>
            {shortcut || '-'}
            <SubLabel>{description || (t.s('open') + ' ' + t.s('browserExtension').toLowerCase())}</SubLabel>
        </div>
    )

    render() {
        return (
            <>
                <Title>
                    {t.s('helpHotKey')}
                </Title>
    
                <Layout type='columns'>
                    {this.state.all.map(this.renderHotkey)}
                </Layout>
    
                {hotkeys.link() ? (
                    <SubLabel>
                        <a
                            href=''
                            onClick={e=>{e.preventDefault();openTab(hotkeys.link(), true)}}>
                            {t.s('change')} {t.s('helpHotKey').toLowerCase()}
                        </a>
                    </SubLabel>
                ) : null}
            </>
        )
    }
}

export default SettingsExtensionHotkeys