import React, { useCallback, useState } from 'react'
import Api from '~data/modules/api'
import Button from '~co/common/button'
import Preloader from '~co/common/preloader'
import { copyText } from '~modules/browser/copyText'

export default function HighlightsCopyButton({ _id, children, ...etc }) {
    const [loading, setLoading] = useState(false)

    const onCopyClick = useCallback(async ()=>{
        setLoading(true)
        const text = await Api._get(`raindrop/${_id}/highlights.txt`)
        copyText(text)
        setLoading(false)
    }, [_id])

    return (
        <Button 
            {...etc}
            disabled={loading}
            onClick={onCopyClick}>
            {loading ? (
                <Preloader />
            ) : children}
        </Button>
    )
}