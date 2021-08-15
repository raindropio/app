import React from 'react'
import { target } from '~target'
import { Redirect } from 'react-router-dom'

let Component = target == 'extension' ? 
	require('./routes').default :
	function(){return <Redirect to='/' />}

export default Component