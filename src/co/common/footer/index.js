import s from './index.module.styl'
import React from 'react'

function Footer({ as='div', className='', forwardedRef, ...etc }) {
    const Component = as
    
    return (
        <Component 
            ref={forwardedRef}
            className={s.footer+' '+className}
            {...etc} />
    )
}

export default React.forwardRef((props, ref) => {
    return <Footer {...props} forwardedRef={ref} />
})

export function Space() {
    return <div className={s.space} />
}