import React, { useMemo, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { makeDraftStatus } from '~data/selectors/bookmarks'

import Button, { AutoClick } from '~co/common/button'
import Icon from '~co/common/icon'

export default function AddHeaderClose({ item }) {
    const getDraftStatus = useMemo(()=>makeDraftStatus(), [])
    const status = useSelector(state=>getDraftStatus(state, item.link))

    const [autoClose, setAutoClose] = useState(true)

    useEffect(()=>{
        function stopAutoClose() {
            setAutoClose(false)
        }
        window.addEventListener('click', stopAutoClose)
        window.addEventListener('keydown', stopAutoClose)
        return ()=>{
            window.removeEventListener('click', stopAutoClose)
            window.removeEventListener('keydown', stopAutoClose)
        }
    }, [])

    return (
        <AutoClick 
            enabled={status=='loaded' && autoClose}
            duration={1500}
            onClick={window.close}>
            <Button onClick={window.close}>
                <Icon name='close' />
            </Button>
        </AutoClick>
    )
}