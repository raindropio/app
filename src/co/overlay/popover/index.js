import s from './index.module.styl'
import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react'
import { PropTypes } from 'prop-types'
import { Portal } from 'react-portal'
import { Helmet } from 'react-helmet'
import debounce from '~modules/format/callback/debounce'
import { eventOrder } from '~modules/browser'

import Context from './context'

//save mouse position
let _mousePos = { x:-1, y:-1 }
document.documentElement.addEventListener('mousedown', function(e){
    _mousePos = { x: e.pageX, y: e.pageY }
})

function Popover({ pin, innerRef, className='', children, dataKey, hidden=false, closable=true, stretch=false, onClose, ...etc }) {
    const _container = useRef(null)

    const context = useMemo(()=>({
        close: ()=>{onClose && onClose()}
    }), [onClose])

    useEffect(()=>{
        if (!_container.current) return
        const a = _container.current
        eventOrder.add(a)
        return ()=>eventOrder.delete(a)
    }, [_container])

    //position
    const [style, setStyle] = useState({ opacity: 0 })

    const place = useCallback(
        ()=>{
            if (!_container.current) return

            let y, x, pinHeight=0

            //use current mouse position
            y = _mousePos.y
            x = _mousePos.x

            //pin to active element
            if (pin && pin.current)
                try{
                    const { left, top, height } = pin.current.getBoundingClientRect()
                    y = top + height
                    x = left
                    pinHeight = height
                }catch(e){}

            //prevent showing outside of viewport
            const { innerWidth, innerHeight } = window
            const { offsetWidth, offsetHeight } = _container.current

            if (x + offsetWidth > innerWidth)
                x = innerWidth - offsetWidth - 16
            if (x < 0)
                x = 16

            if (!stretch && y + offsetHeight > innerHeight)
                y -= offsetHeight + pinHeight

            if (y < 0)
                y = 16

            setStyle({
                opacity: 1,
                '--top': parseInt(y)+'px',
                '--left': parseInt(x)+'px'
            })
        },
        [_container, pin, stretch, setStyle]
    )
    const placeDebounced = useMemo(()=>
        debounce(place, 100, { leading: true, maxWait: 1000 }),
        [place]
    )

    //update position on some events
    useEffect(()=>{
        placeDebounced()
    }, [place, dataKey, hidden])

    //click outside
    useEffect(()=>{
        const onBodyMouseDown = e=>{
            if (!_container.current) return
            if (!closable) return

            if (!_container.current.contains(e.target))
                context.close()
        }

        setTimeout(()=>window.addEventListener('mousedown', onBodyMouseDown))
        return ()=>window.removeEventListener('mousedown', onBodyMouseDown)
    }, [_container, context, closable])

    //global hotkeys
    useEffect(()=>{
        const onWindowKeyDown = e=>{
            switch(e.key) {
                case 'Escape':
                    if (!eventOrder.isLast(_container.current))
                        return
    
                    e.preventDefault()
                    e.stopPropagation()
                    return context.close()
            }
        }

        window.addEventListener('keydown', onWindowKeyDown)
        return ()=>window.removeEventListener('keydown', onWindowKeyDown)
    }, [_container, context])

    if (innerRef)
        innerRef(_container)

    return (
        <Portal>
            <Context.Provider value={context}>
                {stretch && !hidden ? (
                    <Helmet>
                        <html data-popover-showing />
                    </Helmet>
                ) : null}

                <div 
                    {...etc}
                    ref={_container}
                    className={className+' '+s.wrap}
                    style={style}
                    data-closable={closable}
                    data-hidden={hidden}
                    data-stretch={stretch}>
                    <div className={s.body}>
                        {children}
                    </div>
                </div>
            </Context.Provider>
        </Portal>
    )
}

Popover.propTypes = {
    pin: PropTypes.oneOfType([
        PropTypes.func, 
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]),
    innerRef: PropTypes.oneOfType([
        PropTypes.func, 
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]),

    className: PropTypes.string,
    dataKey: PropTypes.any,

    closable: PropTypes.bool,
    stretch: PropTypes.bool,
    onClose: PropTypes.func
}

export default Popover

export * from './menu'
export * from './more'