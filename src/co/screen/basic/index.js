import s from './index.module.css'
import React from 'react'

export default ({ className, children, ...etc })=>(
    <div {...etc} className={s.page + ' ' + className}>
        {children}
    </div>
)