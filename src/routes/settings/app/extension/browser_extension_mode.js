import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { set } from '~data/actions/config'

import { Label, Radio, SubLabel } from '~co/common/form'

function SettingsBrowserExtensionMode({ browser_extension_mode, set }) {
    return (
        <>
            <Label>
                {t.s('mode')}
            </Label>
            <div>
                {[
                    ['clipper', 'Clipper', t.s('clipperD')],
                    ['mini_app', t.s('mini') + ' ' + t.s('app'), t.s('miniAppD')]
                ].map(([key, title, desc])=>
                    <>
                        <Radio 
                            key={key}
                            checked={browser_extension_mode==key}
                            name='browser_extension_mode'
                            onChange={e=>set('browser_extension_mode', key)}>
                            {title}
                        </Radio>
                        <SubLabel>{desc}</SubLabel>
                    </>
                )}
            </div>
        </>
    )
}

export default connect(
    ({ config: { browser_extension_mode } })=>({
        browser_extension_mode
    }),
    { set }
)(SettingsBrowserExtensionMode)