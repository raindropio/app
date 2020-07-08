import s from './index.module.styl'
import React from 'react'

function ButtonInner({ Tag='div', className='', variant, size, forwardedRef, navigate, ...etc }) {
    if (etc.href)
        Tag = 'a'

    return (
        <Tag 
            tabIndex='0'
            ref={forwardedRef}
            className={s.button+' '+className}
            data-variant={variant||'default'}
            data-size={size||'default'}
            {...etc} />
    )
}

export default React.forwardRef((props, ref) => {
    return <ButtonInner {...props} forwardedRef={ref} />
})