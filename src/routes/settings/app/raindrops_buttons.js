import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { set } from '~data/actions/config'

import { Label } from '~co/common/form'
import Select from '~co/common/select'

function SettingsAppRaindropsButtons({ raindrops_buttons, set }) {
    return (
        <>
            <Label>{t.s('buttons')}</Label>
            <div>
                <Select variant='outline'>
                    <option>{t.s('hide')}</option>
                </Select>

                <Select variant='outline'>
                    <option>{t.s('hide')}</option>
                </Select>

                <Select variant='outline'>
                    <option>{t.s('hide')}</option>
                </Select>

                <Select variant='outline'>
                    <option>{t.s('hide')}</option>
                </Select>
            </div>
        </>
    )
}

export default connect(
    state=>({
        raindrops_buttons: state.config.raindrops_buttons
    }),
    { set }
)(SettingsAppRaindropsButtons)