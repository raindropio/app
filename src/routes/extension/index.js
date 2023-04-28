import React from 'react'
import { target } from '~target'
import { Navigate } from 'react-router-dom'

let Component = target == 'extension' ? 
	require('./index.extension').default :
	function(){return <Navigate to='/' replace />}

export default Component