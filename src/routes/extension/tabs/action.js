import React from 'react'
import t from '~t'
import { Buttons } from '~co/common/form'
import Button from '~co/common/button'
import Preloader from '~co/common/preloader'

export default function ExtensionTabsAction({ tabs, loading }) {
    if (loading)
        return (
            <Buttons>
                <Button data-block>
                    <Preloader />
                </Button>
            </Buttons>
        )

    return (
        <Buttons>
            <Button 
                autoFocus
                data-block
                as='input'
                type='submit'
                data-block
                variant='primary'
                value={`${t.s('save')} ${tabs.length} ${t.s('tabs').toLowerCase()}`} />
        </Buttons>
    )
}