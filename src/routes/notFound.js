import React from 'react'
import { Redirect } from 'react-router-dom'
import { target } from '~target'

export default ({ location: { hash='' } })=>{
	switch(target){
		case 'extension':
			return <Redirect to='/extension' />

		case 'web':
			if (hash.startsWith('#/'))
				return <Redirect to={hash.replace(/^#/, '')} />
		break
	}

	return <Redirect to='/my' />
}