import React from 'react'
import { HashRouter as Router, Switch } from 'react-router-dom'

import Document from './document'
import Account from './account/routes'
import App from './app/routes'
import Settings from './settings/routes'

export default ()=>(
    <Router>
        <Document>
            <Switch>
                {Account}
                {Settings}

                {App}
            </Switch>
        </Document>
    </Router>
)