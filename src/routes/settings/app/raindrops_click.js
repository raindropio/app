import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { set } from '~data/actions/config'

import { Label, Radio } from '~co/common/form'

function SettingsAppRaindropsClick({ raindrops_click, set }) {
    return (
        <>
            <Label>{t.s('bookmarkClick')}</Label>
            <div>
                {[
                    ['new_tab', t.s('open') + ' ' + t.s('inNewTab')],
                    ['preview', t.s('preview')],
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