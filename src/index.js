import React from 'react'
import { render } from 'react-dom'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import Routes from './routes'

render(
	<DndProvider backend={HTML5Backend}>
		<Routes />
	</DndProvider>,
	document.getElementById('react')
)