import React from 'react'

//import Toasts from '~co/common/toast'

export default ({ className, children })=>(
    <div id='markup' className={className}>
        {children}

        {/*<Toasts />*/}
    </div>
)