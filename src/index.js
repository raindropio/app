//react
import React from 'react'
import { render } from 'react-dom'
import config from '~config'
import * as Sentry from '@sentry/browser'

//redux
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { withLocalReducer } from '~data'
import localReducers from './local/reducers'

import Translate from '~modules/translate/component'
import Loading from '~co/screen/loading'
import Routes from './routes'

//sentry
if (process.env.NODE_ENV == 'production')
	Sentry.init(config.vendors.sentry)

//init redux
const { store, persistor } = withLocalReducer(localReducers)

render(
	//add other global components in co/screen/basic
	<Provider store={store}>
		<PersistGate loading={<Loading />} persistor={persistor}>
			<Translate Loading={Loading}>
				<Routes />
			</Translate>
		</PersistGate>
	</Provider>,
	
	document.getElementById('react')
)