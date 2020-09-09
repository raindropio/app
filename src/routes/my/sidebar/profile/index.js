import s from './index.module.styl'
import React from 'react'
import { Button } from '~co/user/profile'

export default function SidebarProfile() {
    return (
        <Button id={s.button}>
            {user=>(
                <span>{user.fullName}</span>
            )}
        </Button>
    )
}