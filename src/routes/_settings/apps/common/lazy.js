import s from './clients.module.styl'
import React from 'react'
import Preloader from '~co/common/preloader'

export default function Lazy({ children, status }) {
    if (status == 'loaded')
        return children

    return (
        <div className={s.clients}>
            {status == 'error' ? <b>⚠️ Can't load data</b> : <Preloader/>}
        </div>
    )
}