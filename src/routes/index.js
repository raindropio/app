import React from 'react'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import Document from './_document'

import Account from './account'
import Space from './space'
//import Settings from './settings'

import None from './_none'

export default ()=>(
    <Router>
        <Document>
            <Switch>
                <Route path='/account' component={Account} />
                <Route path='/space/:spaceId(-?\d+):modifier?/:search?' component={Space} />
                {/*<Route path='/settings' component={Settings} />*/}

                {/* Redirects */}
				<Route path='/app/duplicates'><Redirect to='/settings/duplicates' /></Route>
				<Route path='/app/tags'><Redirect to='/settings/tags' /></Route>
				<Route path='/app/libroken'><Redirect to='/settings/libroken' /></Route>
                
                <Route component={None} />
            </Switch>
        </Document>
    </Router>
)