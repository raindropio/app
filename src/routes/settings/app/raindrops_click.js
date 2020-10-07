import React from 'react'
import t from '~t'
import { target } from '~target'
import { connect } from 'react-redux'
import { set } from '~data/actions/config'

import { Label } from '~co/common/form'
import Select from '~co/common/select'

function SettingsAppRaindropsClick({ raindrops_click, set }) {
    return (
        <>
            <Label>{t.s('bookmarkClick')}</Label>
            <div>
                <Select 
                    variant='outline'
                    value={raindrops_click}
                    onChange={e=>set('raindrops_click', e.target.value)}>
                    {[
                        ['current_tab', t.s('open')],
                        ['new_tab', t.s('open') + ' ' + t.s('inNewTab')],
                        ...(target != 'extension' ? [
                            ['preview', t.s('preview')],
                            ['web', 'Web'],
                        ] : []),
                        ['edit', t.s('edit')]
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
        raindrops_click: state.config.raindrops_click
    }),
    { set }
)(SettingsAppRaindropsClick)