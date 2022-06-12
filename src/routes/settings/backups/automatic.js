import React from 'react'
import t from '~t'
import { useSelector } from 'react-redux'
import { isPro } from '~data/selectors/user'

import { Link } from 'react-router-dom'
import Alert from '~co/common/alert'
import links from '~config/links'

export default function SettingsBackupsAutomatic() {
    const pro = useSelector(state=>isPro(state))

    return (
        <Alert style={{gridColumn: '1/-1'}}>
            Never worry about losing your data. Your account creates daily backups of your collections, bookmarks, tags and highlights.
            <br/><br/>

            {pro ? (
                <a href={links.help.backups.automatic} target='_blank'>Learn more</a>
            ) : (<>
                Automatic daily backups available in <b>Pro plan</b>. <Link to='/settings/pro'>{t.s('upgradeToPro')}</Link>
            </>)}
        </Alert>
    )
}