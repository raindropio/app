import React from 'react'
import { target } from '~target'
import { Route, Navigate } from 'react-router-dom'

let Component = target == 'extension' ? 
	require('./index.extension').default :
	function(){return <Route index element={<Navigate to='/' replace />} />}

export default Component