import s from './connect.module.styl'
import React from 'react'
import t from '~t'
import _ from 'lodash'
import config from '~config'
import { connect } from 'react-redux'
import { user } from '~data/selectors/user'
import { API_ENDPOINT_URL } from '~data/constants/app'
import { target } from '~target'

import { Label, Checkbox } from '~co/common/form'
import Icon from '~co/common/icon'
import Alert from '~co/common/alert'

function SettingsProfileConnect({ user, location: { pathname } }) {
    return (
        <>
            <Label>{t.s('signInSocial')}</Label>
            
            {target == 'web' ? (
                <div>
                    {['google', 'apple', 'facebook', 'twitter', 'vkontakte'].map(key=>{
                        const enabled = user[key] && user[key].enabled

                        return (
                            <Checkbox 
                                key={key}
                                checked={enabled}
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
            ) : (
                <Alert variant='warning'>
                    Please <a href={`${config.links.app.index}${pathname}`} target='_blank'>open web app</a> to configure social accounts!
                </Alert>
            )}
        </>
    )
}

export default connect(
    state=>({
        user: user(state)
    })
)(SettingsProfileConnect)