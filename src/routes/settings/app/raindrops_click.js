import React from 'react'
import t from '~t'
import { target } from '~target'
import { connect } from 'react-redux'
import { set } from '~data/actions/config'

import { Label, Radio } from '~co/common/form'

function SettingsAppRaindropsClick({ raindrops_click, set }) {
    return (
        <>
            <Label>{t.s('bookmarkClick')}</Label>
            <div>
                {[
                    ['current_tab', t.s('open')],
                    ['new_tab', t.s('open') + ' ' + t.s('inNewTab')],
                    ...(target != 'extension' ? [
                        ['preview', t.s('preview')],
                        ['web', 'Web'],
                    ] : []),
                    ['edit', t.s('edit')]
                ].map(([key, label])=>
                    <Radio 
                        key={key}
                        name='raindrops_click'
                        checked={raindrops_click==key}
                        onChange={e=>set('raindrops_click', key)}>
                        {label}
                    </Radio>
                )}
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