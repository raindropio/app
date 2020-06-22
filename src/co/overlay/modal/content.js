import s from './content.module.styl'
import React from 'react'

//data-stretch
export default function ModalContent({ children, ...etc }) {
    return (
        <div className={s.content} {...etc}>
            {children}
        </div>
    )
}