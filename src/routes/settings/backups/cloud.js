import s from './cloud.module.styl'
import React from 'react'
import { useLocation } from 'react-router-dom'
import t from '~t'
import _ from 'lodash'
import { target } from '~target'
import config from '~config'
import { connect } from 'react-redux'
import { user, isPro } from '~data/selectors/user'
import { API_ENDPOINT_URL } from '~data/constants/app'

import { Label, Checkbox } from '~co/common/form'
import Alert from '~co/common/alert'
import Icon from '~co/common/icon'

function SettingsBackupsCloud({ user, pro }) {
    const { pathname } = useLocation()
    const webApp = target == 'web'

    return (
        <>
            <Label>{t.s('cloudBackup')}</Label>

            <div>
                {!webApp && (
                    <Alert variant='warning'>
                        Please <a href={`${config.links.app.index}${pathname}`} target='_blank'>open web app</a> to configure cloud backup!
                    </Alert>
                )}

                {['dropbox', 'gdrive'].map(key=>{
                    const enabled = user[key] && user[key].enabled

                    return (
                        <Checkbox 
                            key={key}
                            checked={enabled}
                            disabled={!pro || !webApp}
                            onChange={()=>window.location=`${API_ENDPOINT_URL}user/connect/${key}/${enabled ? 'revoke' : ''}`}
                            className={enabled ? s.enabled : s.default}>
                            <Icon 
                                name={key}
                                className={s.icon+' '+s[key]} />
                            {_.capitalize(key)}
                        </Checkbox>
                    )
                })}
            </div>
        </>
    )
}

export default connect(
    state=>({
        user: user(state),
        pro: isPro(state)
    })
)(SettingsBackupsCloud)