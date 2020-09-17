import React from 'react'
import { target, environment } from '~target'
import config from '~config'
import Analytics from 'react-router-ga'

export default ({children})=>{
    //disable on firefox extension
    if (target == 'extension' && environment.includes('firefox'))
        return children

    return (
        <Analytics id={config.vendors.ga.id}>
            {children}
        </Analytics>
    )
}