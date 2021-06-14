import React, { useRef, useState, useCallback } from 'react'

import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Popover from '../'

function MoreInner({ children, forwardedRef, content, ...etc }) {
    const button = useRef(null)

    //show/hide
    const [mouseOver, setMouseOver] = useState(false)

    const timeout = useRef(null)

    const onMouseEnter = useCallback(()=>{
        clearTimeout(timeout.current)
        setMouseOver(true)
    }, [])

    const onMouseLeave = useCallback(()=>{
        clearTimeout(timeout.current)
        setMouseOver(false)
    }, [])

    const onButtonMouseLeave = useCallback(()=>{
        clearTimeout(timeout.current)
        timeout.current = setTimeout(onMouseLeave, 250);
    }, [onMouseLeave])

    return (
        <>
            <Button
                {...etc}
                ref={forwardedRef || button}
                onMouseUp={onMouseEnter}
                onFocus={onMouseEnter}
                onBlur={onButtonMouseLeave}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onButtonMouseLeave}>
                {content ? content : <Icon name='arrow' size='micro' />}
            </Button>

            <Popover 
                pin={forwardedRef || button}
                hidden={!mouseOver}
                onClose={onMouseLeave}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}>
                {children}
            </Popover>
        </>
    )
}

export const More = React.forwardRef((props, ref) => (
    <MoreInner {...props} forwardedRef={ref} />
))