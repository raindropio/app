import React, { useState, useRef, useCallback } from 'react'
import t from '~t'

import Button from '~co/common/button'
import Icon from '~co/common/icon'
import Sharing from '~co/collections/sharing'

export default function PageMySpaceHeaderShare({ cId }) {
    const [show, setShow] = useState(false)
    const pin = useRef(null)

    const onSharingClick = useCallback(e=>{
        e.preventDefault()
        setShow(true)
    }, [])

    const onSharingClose = useCallback(()=>setShow(false), [])

    if (parseInt(cId) <= 0)
        return null

    return (
        <>
            <Button ref={pin} title={t.s('share')} onClick={onSharingClick}>
                <Icon name='share' />
                <span className='hide-on-small-body'>{t.s('share')}</span>
            </Button>

            {show ? (
                <Sharing 
                    pin={pin}
                    _id={cId}
                    onClose={onSharingClose} />
            ) : null}
        </>
    )
}