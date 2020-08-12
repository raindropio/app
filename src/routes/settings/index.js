import s from './index.module.styl'
import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Protected from '~co/screen/protected'
import Screen from '~co/screen/basic'
import Header from './header'
import Tabs from './tabs'

import App from './app'
import Pro from './pro'
import Profile from './profile'
import Import from './import'
import Backups from './backups'
import Integrations from './integrations'
import Help from './help'

export default (props)=>(
    <Protected>
        <Screen className={s.settings}>
            <Header {...props} />
            <Tabs {...props} />

            <div className={s.body}>
                <Switch>
                    <Route path={`${props.match.path}/app`} component={App} />
                    <Route path={`${props.match.path}/profile`} component={Profile} />
                    <Route path={`${props.match.path}/pro`} component={Pro} />
                    <Route path={`${props.match.path}/import`} component={Import} />
                    <Route path={`${props.match.path}/backups`} component={Backups} />
                    <Route path={`${props.match.path}/integrations`} component={Integrations} />
                    <Route path={`${props.match.path}/help`} component={Help} />

                    {/* Default route */}
                    <Route><Redirect to={`${props.match.path}/app`} /></Route>
                </Switch>
            </div>
        </Screen>
    </Protected>
)