import s from './index.module.styl'
import React from 'react'

export function MenuInner({ children, forwardedRef, className='', ...etc }) {
    return (
        <div {...etc} ref={forwardedRef} className={s.menu+' '+className}>
            {children}
        </div>
    )
}

export const Menu = React.forwardRef((props, ref) => {
    return <MenuInner {...props} forwardedRef={ref} />
})

export * from './item'
export * from './separator'
export * from './section'