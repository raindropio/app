import { useMemo } from 'react'
import { useSelector } from 'react-redux'

export default function useSpaceId({ originalSpaceId, originalValue }) {
    const incollection = useSelector(state=>state.config.raindrops_search_incollection)

    return useMemo(()=>{
        if(originalValue || incollection || !parseInt(originalSpaceId))
            return originalSpaceId
        
        return 0
    }, [incollection, originalSpaceId, originalValue])
}