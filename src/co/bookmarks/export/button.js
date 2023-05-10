import React, { useRef, useState } from 'react'
import t from '~t'

import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Popover from './popover'

export default function BookmarksExportButton({ spaceId = 0, variant }) {
    const pin = useRef(null)
    const [menu, setMenu] = useState(false)

    return (
        <>
            <Button 
                ref={pin}
                variant={variant}
                title={t.s('more')}
                onMouseDown={()=>setMenu(true)}>
                <Icon name='download' />
                <span className='hide-on-small-body'>
                    {t.s('export')}
                </span>
            </Button>

            {menu && (
                <Popover 
                    spaceId={spaceId}
                    pin={pin} 
                    onClose={()=>setMenu(false)} />
            )}
        </>
    )
}