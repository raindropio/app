import s from './index.module.styl'
import React from 'react'
import t from '~t'
import Frame from './frame.svg?component'

export default function ExtensionWelcomeActivate() {
    return (
        <div>
            <Frame className={s.frame} />

            <div className={s.done}>
                <h2>{t.s('done')}</h2>
                <p>{t.s('extensionD')}</p>
            </div>
        </div>
    )
}