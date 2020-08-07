//react
import './wdyr'
import React from 'react'
import { render } from 'react-dom'
import Sentry from '~modules/vendors/sentry'
import 'form-request-submit-polyfill'

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

render(
	//!add other global components in co/screen/basic
	<Sentry>
		<Provider store={store}>
			<Document>
				<PersistGate loading={<Loading />} persistor={persistor}>
					<Translate Loading={Loading}>
						<Routes />
					</Translate>
				</PersistGate>
			</Document>
		</Provider>
	</Sentry>,
	
	document.getElementById('react')
)