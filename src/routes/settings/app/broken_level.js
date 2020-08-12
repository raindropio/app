import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { set } from '~data/actions/config'
import config from '~config'

import { Label, Radio } from '~co/common/form'

function SettingsAppBrokenLevel({ broken_level, set }) {
    return (
        <>
            <Label>
                {t.s('broken')} {t.s('links').toLowerCase()}&nbsp;
                <a href={config.links.help['broken-links']} target='_blank'>[?]</a>
            </Label>
            <div>
                {[
                    ['basic', 'Basic mode'],
                    ['default', 'Default mode'],
                    ['strict', 'Strict mode'],
                    ['off', t.s('disable')]
                ].map(([key, label])=>
                    <Radio 
                        key={key}
                        checked={broken_level==key}
                        name='broken_level'
                        onChange={e=>set('broken_level', key)}>
                        {label}
                    </Radio>
                )}
            </div>
        </>
    )
}

export default connect(
    state=>({
        broken_level: state.config.broken_level
    }),
    { set }
)(SettingsAppBrokenLevel)