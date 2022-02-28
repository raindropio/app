import t from '~t'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { highlightUpdate, highlightRemove } from '~data/actions/bookmarks'

import { useSendCallback } from '../useWithWebView/messaging'
import { Confirm } from '~co/overlay/dialog'
import View from './view'

export default function HighlightsItem(props) {
    const { bookmarkId, _id, note, webViewRef } = props

    const dispatch = useDispatch()
    const send = useSendCallback(webViewRef)

    const onScrollIntoView = useCallback(()=>{
        send('RDH_SCROLL', { _id })
    }, [send, _id])

    const onChange = useCallback(changed => 
        dispatch(highlightUpdate(bookmarkId, _id, changed)), 
        [bookmarkId, _id]
    )

    const onRemove = useCallback(()=>{
        if (note)
            Confirm(t.s('areYouSure'), { ok: t.s('remove') })
                .then(yes=>{
                    if (yes)
                        dispatch(highlightRemove(bookmarkId, _id))
                })
        else
            dispatch(highlightRemove(bookmarkId, _id))
    }, [bookmarkId, _id])

    return (
        <View
            {...props}
            onScrollIntoView={webViewRef && webViewRef.current ? onScrollIntoView : undefined}
            onChange={onChange}
            onRemove={onRemove} />
    )
}