import s from './index.module.styl'
import React from 'react'

function Button({ Tag='a', className='', variant, forwardedRef, ...etc }) {
    return (
        <Tag 
            ref={forwardedRef}
            className={s.button+' '+className}
            data-variant={variant||'default'}
            {...etc} />
    )
}

export default React.forwardRef((props, ref) => {
    return <Button {...props} forwardedRef={ref} />
})