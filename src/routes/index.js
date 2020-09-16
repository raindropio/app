import React from 'react'
import { target } from '~target'
import { HashRouter, BrowserRouter, Route, Switch } from 'react-router-dom'
import Analytics from '~modules/analytics'

import Account from './account'
import Add from './add'
import Extension from './extension'
import My from './my'
import Settings from './settings'

import NotFound from './notFound'

const Router = target == 'web' ?
    BrowserRouter :
    HashRouter

export default ()=>(
    <Router>
        <Analytics>
            <Switch>
                <Route path='/account' component={Account} />
                <Route path='/add' component={Add} />
                <Route path='/extension' component={Extension} />
                <Route path='/my' component={My} />
                <Route path='/settings' component={Settings} />

                <Route component={NotFound} />
            </Switch>
        </Analytics>
    </Router>
)