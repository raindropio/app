import React, { useCallback, useState } from 'react'
import t from '~t'
import { useDispatch } from 'react-redux'
import { backup } from '~data/actions/user'

import Alert from '~co/common/alert'
import { Item, ItemIcon, ItemTitle } from '~co/common/list'
import Icon from '~co/common/icon'

export default function SettingsBackupsAdd() {
    const [creating, setCreating] = useState(false)

    const dispatch = useDispatch()
    const onClickNew = useCallback((e)=>{
        e.preventDefault()
        dispatch(backup())
        setCreating(true)
    }, [])

    if (creating)
        return (
            <Alert variant='success'>
                Your new backup is being created, but it may take a few minutes. You can leave this page and come back later.
            </Alert>
        )

    return (
        <Item
            as='a'
            href=''
            onClick={onClickNew}>
            <ItemIcon><Icon name='add' /></ItemIcon>
            <ItemTitle>{t.s('create')} {t.s('newString').toLowerCase()}</ItemTitle>
        </Item>
    )
}