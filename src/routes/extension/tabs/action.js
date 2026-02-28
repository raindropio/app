import React from 'react'
import t from '~t'
import { Buttons } from '~co/common/form'
import Button from '~co/common/button'
import Preloader from '~co/common/preloader'

function buildSaveTabsLabel(t, count) {
    const singular = t.has('tab') ? t.s('tab').toLowerCase() : (t.s('tabs').toLowerCase() === 'tabs' ? 'tab' : t.s('tabs').toLowerCase())
    const plural = t.s('tabs').toLowerCase()
    const noun = count === 1 ? singular : plural
    return `${t.s('save')} ${count} ${noun}`
}

export default function ExtensionTabsAction({ tabs, loading }) {
    if (loading)
        return (
            <Buttons>
                <Button>
                    <Preloader />
                </Button>
            </Buttons>
        )

    return (
        <Buttons>
            <Button 
                autoFocus
                as='input'
                type='submit'
                variant='primary'
                value={buildSaveTabsLabel(t, tabs.length)} />
        </Buttons>
    )
}