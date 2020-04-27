import React from 'react'

//import PopComponent from '~co/pop'
//import Toasts from '~co/common/toast'

export default ({ className, children })=>(
    <div id='markup' className={className}>
        {children}

        {/*<Toasts />
        <PopComponent/>*/}
    </div>
)