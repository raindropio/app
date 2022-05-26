import React, { useState, useRef } from 'react'
import t from '~t'
import { API_ENDPOINT_URL } from '~data/constants/app'

import Popover, { Menu, MenuItem } from '~co/overlay/popover'
import Button from '~co/common/button'

export default function HighlightsExportButton({ _id, ...etc }) {
    const pin = useRef(null)
    const [show, setShow] = useState(false)

    return (<>
        <Button 
            ref={pin}
            title={t.s('export')+' '+t.s('highlights').toLowerCase()}
            {...etc}
            onClick={()=>setShow(true)} />

        {show ? (
            <Popover pin={pin} onClose={()=>setShow(false)}>
                <Menu>
                    <MenuItem download href={`${API_ENDPOINT_URL}raindrop/${_id}/highlights.txt`}>Text</MenuItem>
                    <MenuItem download href={`${API_ENDPOINT_URL}raindrop/${_id}/highlights.csv`}>CSV</MenuItem>
                </Menu>
            </Popover>
        ) : null}
    </>)
}