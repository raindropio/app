import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Layout from './layout'
import Activate from './activate'
import Greeting from './greeting'

export default ()=>{
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path='activate' element={<Activate />} />
				<Route index element={<Greeting />} />
			</Route>
		</Routes>
	)
}