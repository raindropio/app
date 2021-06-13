import s from './content.module.styl'
import React from 'react'

//data-stretch
function ModalContent({ as='div', forwardedRef, children, className='', ...etc }) {
    const Component = as
    
    return (
        <Component {...etc} ref={forwardedRef} className={s.content+' '+className}>
            {children}
        </Component>
    )
}

export default React.forwardRef((props, ref) => {
    return <ModalContent {...props} forwardedRef={ref} />
})