import React, { useCallback } from 'react'
import t from '~t'
import browser from '~target/extension/browser'

import Button from '~co/common/button'
import { Alert } from '~co/overlay/dialog'

export default function BookmarksAddPermission({ reload }) {
    const onRequestClick = useCallback(()=>{
        browser.permissions.request({ permissions: ['tabs'] })
            .then(reload)
            .catch(()=>{
                Alert(t.s('cantSetPermissions'), {
                    variant: 'error',
                    description: t.format('cantSetPermissionsFix', t.s('highlightSavedPages'))
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