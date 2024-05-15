import s from './index.module.styl'
import t from '~t'
import React from 'react'
import { API_ENDPOINT_URL } from '~data/constants/app'
import sessionStorage from '~modules/sessionStorage'
import { target, environment } from '~target'

import { Separator } from '~co/common/form'
import Button from '~co/common/button'
import Icon from '~co/common/icon'

export default function AccountSocialLogin({ disabled }) {
    //fuck you app store review again!
    if (target=='extension' && environment.includes('safari'))
        return null

    const redirect = sessionStorage.getItem('redirect') || ''

    return (<>
        <Separator />
        {['google', 'apple'].map(vendor=>(
            <Button 
                key={vendor}
                className={s[vendor]+' '+s.vendor}
                variant='outline'
                disabled={disabled}
                data-block
                href={`${API_ENDPOINT_URL}auth/${vendor}?redirect=${encodeURIComponent(redirect)}`}>
                <Icon name={vendor} className={s.icon} /> {t.s('signInSocial')} <span>{vendor}</span>
            </Button>
        ))}
    </>)
}