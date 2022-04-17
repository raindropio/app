import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Bookmark from './bookmark'
import Empty from './empty'

export default ()=>{
	return (
		<Routes>
            <Route path=':_id' element={<Bookmark />} />
            <Route index element={<Empty />} />
        </Routes>
	)
}