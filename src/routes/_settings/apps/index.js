import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Main from '~co/screen/splitview/main'

import AppsAuthorized from './authorized'
import AppsDev from './dev'
import AppsDevEdit from './dev/edit'
import AppsDevAdd from './dev/add'

export default ()=>{
	let { path } = useRouteMatch()

	return (
        <Main>
            <Switch>
                <Route path={`${path}/authorized`} component={AppsAuthorized} />
                <Route path={`${path}/dev/edit/:id`} component={AppsDevEdit} />
                <Route path={`${path}/dev/add`} component={AppsDevAdd} />
                <Route path={`${path}/dev`} component={AppsDev} />
            </Switch>
        </Main>
    )
}