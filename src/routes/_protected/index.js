import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userStatus } from '~data/selectors/user'
import { refresh } from '~data/actions/user'

import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Splash from '../_splash'

export default function PageProtected({ redirect }) {
	//auth
	const dispatch = useDispatch()
	const authorized = useSelector(state=>userStatus(state).authorized)
	useEffect(()=>{dispatch(refresh())}, [])

	const { pathname, search } = useLocation()

	switch (authorized) {
		case 'yes':
			return <Outlet />

		case 'no':
			return (<>
				<Navigate 
					to={`/account/login${redirect?`?redirect=${encodeURIComponent(pathname+search)}`:''}`}
					replace />
				<Splash />
			</>)

		default:
			return <Splash />
	}
}