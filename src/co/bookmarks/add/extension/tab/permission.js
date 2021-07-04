import React, { useCallback } from 'react'
import t from '~t'
import Button from '~co/common/button'
import browser from '~target/extension/browser'
import { Alert } from '~co/overlay/dialog'

export default function BookmarksAddPermission({ reload }) {
    const onRequestClick = useCallback(()=>{
        browser.permissions
            .request({
                permissions: ['tabs']
            })
            .then(reload)
            .catch(()=>{
                Alert('Can`t set required permissions', {
                    variant: 'error',
                    description: `Fix: Click Raindrop.io extension button in browser toolbar, then click your profile picture and open Settings. In settings screen enable "${t.s('highlightSavedPages')}" checkbox.`
                })
            })
    }, [])

    return (
        <Button 
            variant='link'
            accent='danger'
            onClick={onRequestClick}>
            ⚠️
        </Button>
    )
}