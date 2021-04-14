import s from './index.module.styl'
import React from 'react'

import { FirstAction } from '~co/common/header'
import { Button } from '~co/user/profile'

export default function SidebarProfile() {
    return (
        <FirstAction className={s.action}>
            <Button id={s.button}>
                {user=>(
                    <span>{user.name}</span>
                )}
            </Button>
        </FirstAction>
    )
}