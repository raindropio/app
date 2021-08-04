import React, { useCallback, useMemo } from 'react'
import t from '~t'
import { useSelector, useDispatch } from 'react-redux'
import { user as getUser } from '~data/selectors/user'
import { logout } from '~data/actions/user'

import { Link } from 'react-router-dom'
import { Header } from '~co/screen/basic'
import { Title, FirstAction, Space } from '~co/common/header'
import Icon, { Avatar } from '~co/common/icon'
import Button from '~co/common/button'

export default function SettingsHeader({ location: { search } }) {
    const dispatch = useDispatch()
    const user = useSelector(state=>getUser(state))

    const backTo = useMemo(()=>{
        const { back='' } = Object.fromEntries(new URLSearchParams(search) || {})
        if (back.startsWith('/'))
            return back
        return '/'
    }, [])

    const onLogoutClick = useCallback(()=>dispatch(logout()),[])

    return (
        <Header 
            data-solid>
            <FirstAction>
                <Button 
                    as={Link} 
                    to={backTo}
                    title={t.s('back')}>
                    <Icon name='back' />
                </Button>
            </FirstAction>

            <Space />

            <Title>
                {t.s('settings')} &nbsp;·&nbsp; <Avatar src={user.avatar} /> {user.name}
            </Title>
            
            <Space />

            <Button 
                title={t.s('logOut')}
                onClick={onLogoutClick}>
                <Icon name='exit' />
            </Button>
        </Header>
    )
}