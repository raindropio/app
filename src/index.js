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
import Document from './routes/_document'

//init redux
const { store, persistor } = withLocalReducer(localReducers)

//init service-worker
if (process.env.NODE_ENV=='production' && 'serviceWorker' in navigator)
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/service-worker.js')
	})

render(
	//add other global components in co/screen/basic
	<Provider store={store}>
		<Document>
			<PersistGate loading={<Loading />} persistor={persistor}>
				<Translate Loading={Loading}>
					<Routes />
				</Translate>
			</PersistGate>
		</Document>
	</Provider>,
	
	document.getElementById('react')
)