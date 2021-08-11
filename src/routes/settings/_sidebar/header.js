import React, { useMemo } from 'react'
import t from '~t'

import { Link } from 'react-router-dom'
import { Header } from '~co/screen/splitview/sidebar'
import Icon from '~co/common/icon'
import Button from '~co/common/button'

export default function SettingsHeader({ location: { search } }) {
    const backTo = useMemo(()=>{
        const { back='' } = Object.fromEntries(new URLSearchParams(search) || {})
        if (back.startsWith('/'))
            return back
        return '/'
    }, [])

    return (
        <Header data-no-shadow>
            <Button 
                as={Link} 
                to={backTo}
                title={t.s('back')}>
                <Icon name='back' />
            </Button>
        </Header>
    )
}