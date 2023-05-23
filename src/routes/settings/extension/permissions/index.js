import React, { useMemo, useEffect, useState, useCallback } from 'react'
import t from '~t'
import browser from '~target/extension/browser'
import config from '~config'

import { Title, Checkbox, SubLabel, Separator } from '~co/common/form'
import Icon from '~co/common/icon'
import { Error } from '~co/overlay/dialog'

function Permission({ required, title }) {
    const [granted, setGranted] = useState(false)
    useEffect(()=>{
        async function load() {
            setGranted(
                await browser.permissions.contains(required)
            )
        }
        
        load()
        browser.permissions.onAdded.removeListener(load)
        browser.permissions.onAdded.addListener(load)
        browser.permissions.onRemoved.removeListener(load)
        browser.permissions.onRemoved.addListener(load)
    }, [required, setGranted])

    const onToggle = useCallback((e)=>{
        browser.permissions[e.currentTarget.checked ? 'request' : 'remove'](required)
            .catch(Error)
    }, [required])

    return (
        <Checkbox 
            checked={granted}
            onChange={onToggle}>
            {title}
        </Checkbox>
    )
}

export default function SettingsExtensionFeatures() {
    const list = useMemo(()=>[
        [
            { permissions: ['tabs'] },
            { title: t.s('highlightSavedPages') }
        ],
        [
            { permissions: ['tabs'], origins: ['*://*/*'] },
            { title: t.s('highlights') }
        ]
    ], [])

    return (
        <>
            <Title>
                {t.s('permissions')}
            </Title>

            <div>
                {list.map(([required, details])=>(
                    <Permission
                        {...details}
                        required={required} />
                ))}
            </div>

            {!!('omnibox' in browser) && (
                <>
                    <Separator />

                    <Title>
                        {t.s('features')}
                    </Title>
                    <div>
                        <Icon name='search' size='micro' />&nbsp;&nbsp;
                        {t.s('omniboxD')}

                        <SubLabel>
                            <a href={config.links.help.omnibox} target='_blank'>{t.s('howToUse')}</a>
                        </SubLabel>
                    </div>
                </>
            )}
        </>
    )
}