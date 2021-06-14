import React, { useRef, useState, useCallback } from 'react'

import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Popover from '../'

export function More({ children, ...etc }) {
    const button = useRef(null)
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
                ref={button}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onButtonMouseLeave}>
                <Icon name='arrow' size='micro' />
            </Button>

            <Popover 
                pin={button}
                hidden={!mouseOver}
                onClose={onMouseLeave}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}>
                {children}
            </Popover>
        </>
    )
}