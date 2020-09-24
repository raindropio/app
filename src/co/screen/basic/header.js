import s from './header.module.styl'
import React from 'react'
import Header from '~co/common/header'

export default ({ className='', ...props })=>(
    <Header className={s.header+' '+className} {...props} />
)