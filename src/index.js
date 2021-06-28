//react
import './wdyr'
import React from 'react'
import { render } from 'react-dom'
import Sentry from '~modules/vendors/sentry'

//polyfills
import 'form-request-submit-polyfill'
import 'intersection-observer'

//redux
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { withLocalReducer } from '~data'
import localReducers from './local/reducers'

import ServiceWorker from '~modules/sw/component'
import Translate from '~modules/translate/component'
import Routes from '~routes'
import Document from './routes/_document'
import App from './routes/_app'
import Splash from './routes/_splash'

//init redux
const { store, persistor } = withLocalReducer(localReducers)

window.onload = ()=>{
	render(
		//!add other global components in co/screen/basic
		<Sentry>
			<ServiceWorker>
				<Provider store={store}>
					<PersistGate loading={<Splash />} persistor={persistor}>
						<Translate loading={<Splash />}>
							<Document>
								<App>
									<Routes />
								</App>
							</Document>
						</Translate>
					</PersistGate>
				</Provider>
			</ServiceWorker>
		</Sentry>,
		
		document.getElementById('react')
	)
}