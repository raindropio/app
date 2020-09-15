import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Protected from '~co/screen/protected'
import Collection from './collection'
import NotFound from './notFound'

export default function MyRoute({ match: { path } }) {
    return (
        <Protected>
            <Switch>
                <Route path={`${path}/:_id(-?\\d+)/:search?`} component={Collection} />
                <Route component={NotFound} />
            </Switch>
        </Protected>
    )
}