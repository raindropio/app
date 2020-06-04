//react
import React from 'react'
import { render } from 'react-dom'
import '~modules/vendors/sentry'

//redux
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { withLocalReducer } from '~data'
import localReducers from './local/reducers'

import Translate from '~modules/translate/component'
import Loading from '~co/screen/loading'
import Routes from './routes'

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