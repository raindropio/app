import React from 'react'
import { Redirect } from 'react-router-dom'

export default ({ location: { hash } })=>{
	switch(process.env.APP_TARGET){
		case 'extension':
			return <Redirect to='/extension' />

		case 'web':
			if (process.env.APP_TARGET == 'web' &&
				hash.startsWith('#/'))
				return <Redirect to={hash.replace(/^#/, '')} />
		break
	}

	return <Redirect to='/my' />
}