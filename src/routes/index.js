import React from 'react'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import Document from './_document'
import Home from './_home'
import Account from './account/routes'
import Collection from './collection/routes'
import Settings from './settings/routes'

export default ()=>(
    <Router>
        <Document>
            <Switch>
                {Account}
                {Settings}

                {/* Legacy */}
				<Route path='/app/duplicates'><Redirect to='/settings/duplicates' /></Route>
				<Route path='/app/tags'><Redirect to='/settings/tags' /></Route>
				<Route path='/app/libroken'><Redirect to='/settings/libroken' /></Route>

                {Collection}

                <Route><Home/></Route>
            </Switch>
        </Document>
    </Router>
)