import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Protected from '../_protected'
import Clipper from './clipper'
import Welcome from './welcome'
import Tabs from './tabs'
import Highlights from './highlights'

export default ()=>{
	return (
		<Routes>
			<Route path='welcome' element={<Welcome />} />

			<Route element={<Protected redirect />}>
				<Route path='clipper' element={<Clipper />} />
				<Route path='tabs/:collectionId' element={<Tabs />} />
				<Route path='highlights/*' element={<Highlights />} />
			</Route>
		</Routes>
	)
}