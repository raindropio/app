import s from './footer.module.styl'
import React from 'react'
import pjson from '~package.json'

export default class SettingsFooter extends React.Component {
    render() {
        return (
            <footer className={s.footer}>
                Raindrop.io {pjson.version}
            </footer>
        )
    }
}