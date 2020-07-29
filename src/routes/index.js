import React from 'react'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import Account from './account'
import Collection from './collection'
//import Settings from './settings'

import None from './_none'

export default ()=>(
    <Router>
        <Switch>
            <Route path='/account' component={Account} />
            <Route path='/:_id(-?\d+)/:search?' component={Collection} />
            {/*<Route path='/settings' component={Settings} />*/}

            {/* Redirects */}
            <Route path='/app/duplicates'><Redirect to='/settings/duplicates' /></Route>
            <Route path='/app/tags'><Redirect to='/settings/tags' /></Route>
            <Route path='/app/libroken'><Redirect to='/settings/libroken' /></Route>
            
            <Route component={None} />
        </Switch>
    </Router>
)