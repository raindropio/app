import React, { useCallback } from 'react'

import Popover from '~co/overlay/popover'
import Suggestions from './suggestions'
import Help from './help'

export default function SearchMenu(props) {
    const { downshift: { getMenuProps, isOpen }, fieldRef, suggestions } = props

    //prevent the default handler behavior of downshift for some keypresses
    const onKeyDown = useCallback(e=>{
        switch(e.key) {
            case 'Enter':
            case 'Home':
            case 'End':
                e.nativeEvent.preventDownshiftDefault = true
                break
        }
    }, [])

    //prevent blur of input on click
    const preventDefault = useCallback(e=>{
        if (!e.target.href)
            e.preventDefault()
    }, [])

    return (
        <Popover 
            pin={fieldRef}
            stretch={true}
            hidden={!isOpen || !suggestions.length}>
            <div {...getMenuProps({ onKeyDown, onMouseDown: preventDefault, onClick:preventDefault })}>
                {isOpen && (<>
                    <Suggestions {...props} />
                    <Help {...props} />
                </>)}
            </div>
        </Popover>
    )
}