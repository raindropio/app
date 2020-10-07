import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { set } from '~data/actions/config'
import config from '~config'

import { Label, Radio } from '~co/common/form'
import Select from '~co/common/select'

function SettingsAppBrokenLevel({ broken_level, set }) {
    return (
        <>
            <Label>
                {t.s('broken')} {t.s('links').toLowerCase()}&nbsp;
                <a href={config.links.help['broken-links']} target='_blank'>[?]</a>
            </Label>
            <div>
                <Select 
                    variant='outline'
                    value={broken_level}
                    onChange={e=>set('broken_level', e.target.value)}>
                    {[
                        ['basic', 'Basic mode'],
                        ['default', 'Default mode'],
                        ['strict', 'Strict mode'],
                        ['off', t.s('disable')]
                    ].map(([key, label])=>
                        <option 
                            key={key}
                            value={key}>
                            {label}
                        </option>
                    )}
                </Select>
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