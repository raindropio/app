import React from 'react'
import { Redirect } from 'react-router-dom'
import { target } from '~target'

export default ({ location: { hash='', search='' } })=>{
	switch(target){
		case 'extension':
			return <Redirect to='/extension' />

		case 'web':
			//rewrite links of old app
			if (search.includes('is_clipper')){
				window.location.href=`https://extension.raindrop.io/${search}`
				return null
			}

			if (hash.startsWith('#/'))
				return <Redirect to={hash.replace(/^#/, '')} />
		break
	}

	return <Redirect to='/my' />
}