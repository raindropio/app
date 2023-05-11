import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { target, environment } from '~target'
import Splash from './_splash'

export default function PageDefault() {
    const { browser_extension_mode } = useSelector(state=>state.config)
    const { visitedSpace } = useSelector(state=>state.local)

    let to = `/my/${parseInt(visitedSpace?.cId)||'0'}${visitedSpace?.search ? ('/' + visitedSpace.search) : ''}`
    
    if (target == 'extension')
        if (environment.includes('browser_action'))
            switch(browser_extension_mode) {
                case 'clipper':
                    to = '/extension/clipper'
                    break
            }

    return (<>
        <Splash />
        <Navigate to={to} replace />
    </>)
}