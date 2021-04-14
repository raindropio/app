import s from './avatar.module.styl'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import t from '~t'
import withEdit from '~co/user/withEdit'
import { avatarUpload } from '~data/actions/user'

import { Error } from '~co/overlay/dialog'
import { Label } from '~co/common/form'
import Button from '~co/common/button'
import Icon, { Avatar } from '~co/common/icon'

function AccountProfileAvatar({ avatar, status }) {
    const dispatch = useDispatch()

    const onUpload = useCallback(e=>{
        if (!e.target.files[0]) return

        dispatch(avatarUpload(
            e.target.files[0],
            ()=>{},
            Error
        ))
    }, [dispatch])

    return (
        <>
            <Label>{t.s('avatar')}</Label>

            <div className={s.wrap}>
                {avatar && (
                    <Avatar 
                        className={s.avatar}
                        src={avatar} />
                )}

                <Button 
                    as='label'
                    variant='outline'
                    disabled={status=='loading'}>
                    <Icon name='upload' />
                    {t.s('upload')}…

                    <input 
                        type='file'
                        style={{display: 'none'}}
                        onChange={onUpload} />
                </Button>
            </div>
        </>
    )
}

export default withEdit(AccountProfileAvatar, ['avatar'])