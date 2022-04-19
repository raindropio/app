import React from 'react'
import { Route } from 'react-router-dom'

import Bookmark from './bookmark'
import Empty from './empty'

export default ()=>{
	return (<>
        <Route path=':_id' element={<Bookmark />} />
        <Route index element={<Empty />} />
    </>)
}