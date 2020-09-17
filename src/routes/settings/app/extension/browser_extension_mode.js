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
                    ['mini_app', t.s('mini') + ' ' + t.s('app') + ' (beta)', t.s('miniAppD')]
                ].map(([key, title, desc])=>
                    <React.Fragment key={key}>
                        <Radio 
                            checked={browser_extension_mode==key}
                            name='browser_extension_mode'
                            onChange={()=>set('browser_extension_mode', key)}>
                            {title}
                        </Radio>
                        <SubLabel>{desc}</SubLabel>
                    </React.Fragment>
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