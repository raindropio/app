import s from './preloader.module.styl'
import React from 'react'

export default function WebViewPreloader({ className='' }) {
    return (
        <div className={s.wrap+' '+className}>
            <div className={s.line} />
        </div>
    )
}