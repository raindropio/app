import s from './user.module.styl'
import React from 'react'
import UserAbout from '~co/user/about'

export default function SettingsSidebarUser() {
    return (
        <div className={s.user}>
            <UserAbout className={s.about} />
        </div>
    )
}