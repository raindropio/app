import { useEffect, useState } from 'react'
import { useMessageEffect, useSendCallback } from './messaging'

import { useSelector, useDispatch } from 'react-redux'
import { isPro } from '~data/selectors/user'
import { highlights as getHighlights } from '~data/selectors/bookmarks'
import { oneLoad, highlightAdd, highlightUpdate, highlightRemove } from '~data/actions/bookmarks'

export default function useWithWebView(ref, _id) {
    //state
    const [ready, setReady] = useState(0)
    const dispatch = useDispatch()
    const pro = useSelector(state=>isPro(state))
    const highlights = useSelector(state=>getHighlights(state, _id))

    //messaging
    const send = useSendCallback(ref)

    useMessageEffect(ref, (type, payload) => {
        switch(type) {
            case 'RDH_READY':   setReady(r=>r+1); break
            case 'RDH_ADD':     dispatch(highlightAdd(_id, payload)); break
            case 'RDH_UPDATE':  dispatch(highlightUpdate(_id, payload._id, payload)); break
            case 'RDH_REMOVE':  dispatch(highlightRemove(_id, payload._id)); break
        }
    }, [_id, send])

    //effects
    useEffect(()=>{dispatch(oneLoad(_id))}, [_id])
    useEffect(()=>{
        if (!ready) return
        send('RDH_CONFIG', { enabled: true, pro, nav: true })
        send('RDH_APPLY', highlights)
    }, [ready, highlights, pro])
}