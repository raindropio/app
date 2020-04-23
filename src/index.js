import React from 'react'
import { render } from 'react-dom'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import Translate from '~modules/translate/component'
import Routes from './routes'

render(
	<Translate>
		<DndProvider backend={HTML5Backend}>
			<Routes />
		</DndProvider>
	</Translate>,
	
	document.getElementById('react')
)