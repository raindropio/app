import { useCallback } from 'react'

export default function useSafeClose(frameRef) {
    return useCallback(()=>
        frameRef.current && frameRef.current.contentWindow.dispatchEvent(new Event('beforeunload', { cancelable: true })),
        [frameRef]
    )
}