import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { set } from '~data/actions/config'

import { Label, Radio, Checkbox } from '~co/common/form'

function SettingsExtensionAdd({ add_default_collection, add_auto_save, browser_extension_mode, set }) {
    if (browser_extension_mode != 'clipper')
        return null

    return (
        <>
            <Label>
                {t.s('newBookmark')}
            </Label>
            <div>
				<Checkbox 
					checked={add_auto_save}
					onChange={()=>set('add_auto_save', !add_auto_save)}>
					{t.s('save')} {t.s('automatically').toLowerCase()}
				</Checkbox>
			</div>

            <Label>
                {t.s('defaultCollection')}
            </Label>
            <div>
                {[
                    [-1, t.s('defaultCollection--1')],
                    [0, t.s('lastUsed')]
                ].map(([key, title])=>
                    <Radio 
                        key={key}
                        checked={add_default_collection==key}
                        name='add_default_collection'
                        onChange={e=>set('add_default_collection', key)}>
                        {title}
                    </Radio>
                )}
            </div>
        </>
    )
}

export default connect(
    ({ config: { add_default_collection, add_auto_save, browser_extension_mode } })=>({
        add_default_collection, add_auto_save, browser_extension_mode
    }),
    { set }
)(SettingsExtensionAdd)