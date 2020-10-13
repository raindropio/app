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
                <p>
                    When you find something interesting on the web just click cloud icon to save it to Raindrop.io
                </p>
            </div>
        </div>
    )
}