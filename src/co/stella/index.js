import s from './index.module.styl'
import React, { useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { BETA_AI_URL } from '~data/constants/app'
import { useDispatch } from 'react-redux'
import * as userActions from '~data/actions/user'
import * as collectionsActions from '~data/actions/collections'
import * as filtersActions from '~data/actions/filters'

export default function Stella({ raindropId, className, onClose, onToolCalled, ...props }) {
    const iframeRef = useRef(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const url = useMemo(()=>
        BETA_AI_URL + '?' + new URLSearchParams({
            ...(raindropId ? { raindropId } : {}),
            ...(onClose ? { closable: 'true' } : {})
        }).toString(),
        [raindropId, onClose]
    )

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.source !== iframeRef.current?.contentWindow) return

            switch(event.data?.type) {
                case 'ai:link-click':
                    onClose?.()
                    if (event.data?.raindropId)
                        navigate(`/my/0/item/${event.data?.raindropId}/edit`)
                    else if (event.data?.collectionId)
                        navigate(`/my/${event.data?.collectionId}`)
                    else if (event.data?.tag)
                        navigate(`/my/0/${event.data?.tag}`)
                break

                //close clicked
                case 'ai:close':
                    onClose?.()
                break

                //tool called, refresh user data
                case 'ai:tool-called':
                    dispatch(userActions.refresh())
                    dispatch(collectionsActions.refresh())
                    dispatch(filtersActions.load('global'))
                    onToolCalled?.()
                break
            }
        }

        window.addEventListener('message', handleMessage)
        return () => window.removeEventListener('message', handleMessage)
    }, [onClose, onToolCalled, iframeRef, dispatch])

    return (
        <iframe
            {...props}
            ref={iframeRef}
            src={url}
            allow='fullscreen; clipboard-write'
            loading='eager'
            className={className || s.frame}
        />
    )
}