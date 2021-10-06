import s from './index.module.styl'
import React from 'react'
import t from '~t'
import { environment } from '~target'

import Frame from './frame.svg?component'
import iOS from './ios.png'

export default function ExtensionWelcomeActivate() {
    return (
        <div>
            {environment.includes('safari-ios') ? (
                <img src={iOS} className={s.ios} />
            ) : (
                <Frame className={s.frame} />
            )}

            <div className={s.done}>
                <h2>{t.s('done')}</h2>
                <p>{t.s('extensionD')}</p>
            </div>
        </div>
    )
}