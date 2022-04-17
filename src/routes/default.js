import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { target, environment } from '~target'

export default function PageDefault() {
    const { last_collection, browser_extension_mode } = useSelector(state=>state.config)

    let to = `/my/${parseInt(last_collection)||'0'}`
    
    if (target == 'extension')
        if (environment.includes('browser_action'))
            switch(browser_extension_mode) {
                case 'clipper':
                    to = '/extension/clipper'
                    break
            }

    return <Navigate to={to} replace />
}