//react
import React from 'react'
import { render } from 'react-dom'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

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
	<Provider store={store}>
		<PersistGate loading={<Loading />} persistor={persistor}>
			<Translate Loading={Loading}>
				<DndProvider backend={HTML5Backend}>
					<Routes />
				</DndProvider>
			</Translate>
		</PersistGate>
	</Provider>,
	
	document.getElementById('react')
)