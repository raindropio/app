import s from './error.module.styl'
import t from '~t'
import React from 'react'
import { getDomain } from '~modules/format/url'
import getScreenshotUri from '~data/modules/format/screenshot'
import links from '~config/links'

import { isElectron } from './electron'
import Icon from '~co/common/icon'

export default function WebViewError({ className='', src }) {
    return (
        <div className={s.wrap+' '+className}>
            <a 
                href={src} 
                target='_blank' 
                className={s.screenshot}>
                <img src={getScreenshotUri(src)+'?format=webp'} loading='eager' />
            </a>

            <div className={s.message}>
                <Icon name='hide' enlarge='2' />
                <h3>{t.s('preview')} {t.s('error').toLowerCase()}</h3>
                <div>
                    <b>{getDomain(src)}</b> not reachable or blocks site preview.
                </div>
                {!isElectron() && (
                    <div>
                        To be able to preview any site, <a href={links.download} target='_blank'>install our desktop app</a>.
                    </div>
                )}
            </div>
        </div>
    )
}