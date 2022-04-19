import React from 'react'
import { Route } from 'react-router-dom'

import Protected from '../_protected'
import Clipper from './clipper'
import Welcome from './welcome'
import Tabs from './tabs'
import Highlights from './highlights'

export default ()=>{
	return (<>
		<Route path='welcome'>{Welcome()}</Route>

		<Route element={<Protected redirect />}>
			<Route path='clipper' element={<Clipper />} />
			<Route path='tabs/:collectionId' element={<Tabs />} />
			<Route path='highlights'>{Highlights()}</Route>
		</Route>
	</>)
}