//react
import './wdyr'
import React from 'react'
import { render } from 'react-dom'
import Sentry from '~modules/vendors/sentry'
import 'form-request-submit-polyfill'
import ServiceWorker from '~modules/sw/component'

//redux
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { withLocalReducer } from '~data'
import localReducers from './local/reducers'

import Document from './routes/_document'
import Translate from '~modules/translate/component'
import Routes from '~routes'
import LoadingRoute from '~routes/_loading'

//init redux
const { store, persistor } = withLocalReducer(localReducers)

render(
	//!add other global components in co/screen/basic
	<Sentry>
		<ServiceWorker>
			<Provider store={store}>
				<Document>
					<PersistGate loading={<LoadingRoute />} persistor={persistor}>
						<Translate loading={<LoadingRoute />}>
							<Routes />
						</Translate>
					</PersistGate>
				</Document>
			</Provider>
		</ServiceWorker>
	</Sentry>,
	
	document.getElementById('react')
)