import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { set } from '~data/actions/config'

import { Title, Label, Radio, Checkbox, Layout } from '~co/common/form'
import Icon from '~co/common/icon'
import CollectionIcon from '~co/collections/item/icon'

function SettingsExtensionAdd({ add_default_collection, add_auto_save, browser_extension_mode, set }) {
    if (browser_extension_mode != 'clipper')
        return null

    return (
        <>
            <Title>
                Clipper {t.s('settings').toLowerCase()}
            </Title>

            <Layout type='columns'>
                <div>
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
                </div>

                <div>
                    <Label>
                        {t.s('defaultCollection')}
                    </Label>
                    <div>
                        {[
                            [-1, t.s('defaultCollection--1'), <CollectionIcon _id={-1} />],
                            [0, t.s('lastUsed'), <Icon name='sort_-created' />]
                        ].map(([key, title, icon])=>
                            <Radio 
                                key={key}
                                checked={add_default_collection==key}
                                name='add_default_collection'
                                onChange={e=>set('add_default_collection', key)}>
                                {icon}
                                {title}
                            </Radio>
                        )}
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default connect(
    ({ config: { add_default_collection, add_auto_save, browser_extension_mode } })=>({
        add_default_collection, add_auto_save, browser_extension_mode
    }),
    { set }
)(SettingsExtensionAdd)