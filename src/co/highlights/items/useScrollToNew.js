import { useEffect, useRef } from 'react'

export default function useScrollToNew(containerRef, highlights) {
    const prevCount = useRef(0)

    useEffect(()=>{
        if (!containerRef.current) return
        if (highlights.length && prevCount.current && highlights.length > prevCount.current)
            containerRef.current.children[containerRef.current.children.length - 1].scrollIntoView()
    }, [highlights.length, containerRef])

    useEffect(() => prevCount.current = highlights.length, [highlights.length])
}