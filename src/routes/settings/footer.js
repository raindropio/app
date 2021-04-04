import s from './footer.module.styl'
import React from 'react'
import t from '~t'
import pjson from '../../../package.json'
import config from '~config'

export default class SettingsFooter extends React.Component {
    render() {
        return (
            <footer className={s.footer}>
                Raindrop.io {pjson.version}

                <span className={s.links}>
                    ·
                    <a href={config.links.help.index} target='_blank'>{t.s('help')}</a>
                    ·
                    <a href={config.links.help.about} target='_blank'>{t.s('about')}</a>
                </span>
            </footer>
        )
    }
}