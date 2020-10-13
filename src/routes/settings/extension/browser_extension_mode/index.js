import s from './index.module.styl'
import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { set } from '~data/actions/config'

import { Title, Radio, SubLabel, Layout } from '~co/common/form'

class SettingsBrowserExtensionMode extends React.Component {
    render() {
        const { browser_extension_mode, set } = this.props

        return (
            <>
                <Title>
                    {t.s('appearance')}
                </Title>
                <Layout type='columns'>
                    {[
                        [
                            'mini_app', 
                            t.s('mini') + ' ' + t.s('app').toLowerCase(), 
                            t.s('miniAppD'),
                            require('./mini_app.svg?component').default
                        ],
                        [
                            'clipper', 
                            'Clipper', 
                            t.s('clipperD'),
                            require('./clipper.svg?component').default
                        ],
                    ].map(([key, title, desc, Picture])=>
                        <div 
                            key={key}
                            className={s.item}
                            onClick={()=>set('browser_extension_mode', key)}>
                            <Picture 
                                className={s.picture}
                                data-active={browser_extension_mode==key} />
    
                            <Radio 
                                checked={browser_extension_mode==key}
                                readOnly
                                name='browser_extension_mode'>
                                {title}
                            </Radio>
    
                            <SubLabel>{desc}</SubLabel>
                        </div>
                    )}
                </Layout>
            </>
        )
    }
}

export default connect(
    state=>({
        browser_extension_mode: state.config.browser_extension_mode,
    }),
    { set }
)(SettingsBrowserExtensionMode)