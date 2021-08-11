import s from './index.module.styl'
import React from 'react'
import { useSelector } from 'react-redux'
import { user as getUser } from '~data/selectors/user'
import { Avatar } from '~co/common/icon'

export default function UserAbout({ className='' }) {
    const user = useSelector(state=>getUser(state))

    return (
        <div className={s.about+' '+className}>
            <Avatar 
                className={s.avatar}
                enlarge='2'
                src={user.avatar} />

            <div className={s.name}>{user.name}</div>
            <div className={s.email}>{user.email}</div>
        </div>
    )
}