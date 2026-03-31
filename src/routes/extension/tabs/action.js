import React from 'react'
import t from '~t'
import { Buttons } from '~co/common/form'
import Button from '~co/common/button'
import Preloader from '~co/common/preloader'

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
                value={t.format('saveTabsCount', tabs.length)} />
        </Buttons>
    )
}