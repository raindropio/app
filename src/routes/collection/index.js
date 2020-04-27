import React from 'react'
import SplitView from '~co/screen/splitview'
import Protected from '~co/screen/protected'

import Sidebar from './sidebar'
import Main from './main'
import Reader from './reader'

export default ()=>(
	<Protected>
		<SplitView>
			<Sidebar />
			<Main />
			<Reader />
		</SplitView>
	</Protected>
)