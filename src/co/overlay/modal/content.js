import s from './content.module.styl'
import React from 'react'

//data-stretch
export default function ModalContent({ children, className='', ...etc }) {
    return (
        <div {...etc} className={s.content+' '+className}>
            {children}
        </div>
    )
}