import './index.module.styl'
import React from 'react'

export default ({ className, children })=>(
    <div id='markup' className={className}>
        {children}
    </div>
)