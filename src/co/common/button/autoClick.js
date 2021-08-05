import s from './autoClick.module.styl'
import React, { useState, useMemo, useEffect, useRef } from 'react'

export function AutoClick({ enabled=false, duration, children, onClick }) {
    const style = useMemo(()=>({transitionDuration: `${duration}ms`}), [duration])

    const [status, setStatus] = useState('')

    const timeout = useRef(null)

    useEffect(()=>{
        clearTimeout(timeout.current)

        if (enabled){
            timeout.current = setTimeout(()=>{
                setStatus('click')
                onClick()
            }, duration)

            setStatus('animate')
        } else
            setStatus('')

        return ()=>clearTimeout(timeout.current)
    }, [enabled, duration, timeout, children])
    
    return (
        <div 
            className={s.autoClick}
            data-status={status}>
            {children}

            <svg 
                className={s.svg}
                viewBox='0 0 28 28'
                preserveAspectRatio='xMidYMid meet'>
                <circle 
                    className={s.circle}
                    style={style} />
            </svg>
        </div>
    )
}