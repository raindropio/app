import React from 'react'

//data-stretch
export default function ModalContent({ children, ...etc }) {
    return (
        <div className='modal-content' {...etc}>
            {children}
        </div>
    )
}