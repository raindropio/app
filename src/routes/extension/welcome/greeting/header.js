import s from './header.module.styl'
import React from 'react'
import t from '~t'

export default function ExtensionWelcomeHeader() {
    return (
        <div className={s.header}>
            <h2>{t.s('welcome')} <a href='https://raindrop.io' target='_blank'>Raindrop.io</a></h2>
            <p>{t.s('raindropTagline')}</p>
        </div>
    )
}